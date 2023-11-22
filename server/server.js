import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const { PORT, DATABASE_URL } = process.env;

const client = new pg.Client({
  connectionString: DATABASE_URL,
});

await client.connect();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Steam Page");
});

app.get("/api/videogames", (req, res, next) => {
  client.query("SELECT * FROM videogames")
    .then((rows) => {
      res.send(rows);
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/videogames", (req, res, next) => {
  const { name, age_rating, genre, rating } = req.body;
  client.query(
    "INSERT INTO videogames(name, age_rating, genre, rating) VALUES($1, $2, $3, $4) RETURNING *",
    [name, age_rating, genre, rating]
  )
  .then((data) => {
    res.status(201).json(data.rows[0]);
  })
  .catch((error) => {
    next(error);
  });
});

app.patch("/api/videogames/:id", (req, res, next) => {
  const videogameId = Number.parseInt(req.params.id);
  const { name, age_rating, genre, rating } = req.body;
  client
    .query(
      `UPDATE videogames SET
      name = COALESCE ($1, name),
      age_rating = COALESCE ($2, age_rating), 
      genre = COALESCE ($3, genre),
      rating = COALESCE ($4, rating) 
      WHERE id=$5 RETURNING *`,
      [name, age_rating, genre, rating, videogameId]
    )
    .then((data) => {
      if (data.rows.length === 0) {
        res.sendStatus(404);
      } else {
        console.log("Updated videogame: ", data.rows[0]);
        res.send(data.rows[0]);
      }
    })
    .catch((err) => {
      next(err);
    });
});


app.delete("/api/videogames/:id", (req, res, next) => {
  const id = Number(req.params.id);
  client
    .query("DELETE FROM videogames WHERE id = $1 RETURNING *", [id])
    .then((data) => {
      if (data.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(data.rows[0]);
      }
    })
    .catch((err) => {
      next(err);
    });
});

// Additional error handling for unknown routes
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error: ", err);
  res.status(500).json({ error: "Internal Server Error" });
});
