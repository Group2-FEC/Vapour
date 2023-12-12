import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import axios from "axios";
import Redis from "ioredis";

dotenv.config({ path: "../.env" });

const { PORT, DATABASE_URL, API_KEY } = process.env;

const client = new pg.Client({
  connectionString: DATABASE_URL,
});

await client.connect();

const app = express();

app.use(express.json());

//CRUD routes
app.get("/api/games", getRawgGames);
app.get("/api/games/:name", getRawgGameByName);
app.get("/api/game/:id", getRawgGameDetails);
app.get("/api/upcoming", getRawgUpcoming);
app.get("/api/library", getLibraryGames);
app.get("/api/videogames", getDbGames);
app.post("/api/videogames", postDbGame);
app.patch("/api/videogames/:id", editDbGame);
app.delete("/api/videogames/:id", deleteDbGame);

const redis = new Redis(); // Connect to your Redis instance

// Function to fetch data from API and cache it in Redis
async function fetchAndCacheRawgGames() {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=18`
    );
    const gamesData = response.data.results;

    // Cache the fetched data in Redis with an expiration (e.g., 1 hour)
    await redis.set('rawg_games_data', JSON.stringify(gamesData), 'EX', 3600); // Expiration in seconds (1 hour)

    return gamesData; // Return the fetched data
  } catch (error) {
    throw error;
  }
}

// Function to get data either from Redis cache or API
async function getCachedOrFetchGames() {
  const cachedGames = await redis.get('rawg_games_data');

  if (cachedGames) {
    console.log('Data retrieved from Redis cache');
    return JSON.parse(cachedGames); // Return cached data if found in Redis
  } else {
    console.log('Fetching data from API');
    const fetchedGames = await fetchAndCacheRawgGames();
    return fetchedGames; // Return fetched data from API
  }
}

// getRawgGames using cached or fetched data
async function getRawgGames(_, res, next) {
  try {
    const gamesData = await getCachedOrFetchGames();
    res.send(gamesData);
  } catch (error) {
    next(error);
  }
}

// //standard async function to allow hoisting for routes above
// async function getRawgGames(_, res, next) {
//   try {
//     const response = await axios.get(
//       `https://api.rawg.io/api/games?key=${API_KEY}&page_size=18`
//     );
//     res.send(response.data.results);
//     console.log(response.data.results)
//   } catch (error) {
//     next(error);
//   }
// }

// // standard async function to allow hoisting for routes above
// async function getRawgGames(_, res, next) {
//   try {
//     const response = await axios.get(
//       `https://api.rawg.io/api/games?key=${API_KEY}&page_size=18`
//     );
//     const filteredData = response.data.results.map((game) => ({
//       id: game.id,
//       background_image: game.background_image,
//       name: game.name,
//       metacritic: game.metacritic ? game.metacritic : "Not Rated",
//       esrb_rating: game.esrb_rating ? game.esrb_rating.name : "Not Rated",
//       platforms: game.platforms,
//       description: game.description,
//       website: game.website
//     }));
//     res.send(filteredData);
//   } catch (error) {
//     next(error);
//   }
// }

async function getRawgGameDetails(req, res, next) {
  const id = Number(req.params.id);
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    res.send(response.data);
  } catch (error) {
    next(error);
  }
}

async function getRawgGameByName(req, res, next) {
  const name = req.params.name;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
    );
    const filteredData = response.data.results.map((game) => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      esrb_rating: game.esrb_rating ? game.esrb_rating.name : "Not Rated",
      rating: game.rating,
      released: game.released,
    }));
    res.send(filteredData);
  } catch (error) {
    next(error);
  }
}

async function getRawgUpcoming(_, res, next) {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&dates=2023-12-01,2024-01-31&ordering=-released&page_size=28`
    );
    res.send(response.data.results);
  } catch (error) {
    next(error);
  }
}

async function getLibraryGames(_, res, next) {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=28`
    );
    res.send(response.data.results);
  } catch (error) {
    next(error);
  }
}

async function getDbGames(_, res, next) {
  try {
    const data = await client.query(
      "SELECT * FROM videogames ORDER BY id DESC"
    );
    res.send(data.rows);
  } catch (error) {
    next(error);
  }
}

async function postDbGame(req, res, next) {
  const { name, background_image, esrb_rating, released, rating } = req.body;
  try {
    const data = await client.query(
      "INSERT INTO videogames(name, background_image, esrb_rating, released, rating) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, background_image, esrb_rating, released, rating]
    );
    res.status(201).json(data.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function editDbGame(req, res, next) {
  const videoGameId = Number.parseInt(req.params.id);
  const { name, age_rating, genre, rating } = req.body;
  try {
    const data = await client.query(
      `UPDATE videogames SET
      name = COALESCE ($1, name),
      age_rating = COALESCE ($2, age_rating), 
      genre = COALESCE ($3, genre),
      rating = COALESCE ($4, rating) 
      WHERE id=$5 RETURNING *`,
      [name, age_rating, genre, rating, videoGameId]
    );
    if (data.rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.send(data.rows[0]);
    }
  } catch (error) {
    next(error);
  }
}

async function deleteDbGame(req, res, next) {
  const id = Number(req.params.id);
  try {
    const data = await client.query(
      "DELETE FROM videogames WHERE id = $1 RETURNING *",
      [id]
    );
    if (data.rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.send(data.rows[0]);
    }
  } catch (error) {
    next(error);
  }
}

// Additional error handling for unknown routes
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error: ", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
