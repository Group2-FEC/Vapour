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

app.get("/api/videogames", (req, res) => {
  client.query("SELECT * FROM videogames").then((rows) => {
    res.send(rows);
  });
});

app.post("/api/videogames", (req, res) => {
  const { name, age_rating, genre, rating } = req.body;
  client.query(
    "INSERT INTO videogames(name, age_rating, genre, rating) VALUES($1, $2, $3, $4) RETURNING *",
    [name, age_rating, genre, rating]
    )
    .then((data) => {
      res.json(data.rows[0]);
    })
    .catch((error) => {
      console.error("Error creating videogame: ", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.patch("/api/videogames/:id", (req, res) => {
  const videogameId = Number.parseInt(req.params.id);
  const { name, age_rating, genre, rating } = req.body;
client
    .query(
      `UPDATE videogames SET
      name = COALESCE ($1, name),
      age_rating = COALESCE ($2, age_rating), 
      genre = COALESCE ($3, genre),
      rating = COALESCE ($4, rating), 
      WHERE id=$5 RETURNING *`,
    [name, age_rating , genre, rating, videogameId]
    )
      .then((data) => {
        if (data.rows.length == 0){
          res.sendStatus(404);
        }
        console.log("updated videogame: ", data.rows[0]);
        res.send(data.rows[0]);
      }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
      })
    })

app.delete("/api/videogames/:id", (req, res) => {
  const id = Number(req.params.id);
  client.query(
    "DELETE FROM videogames WHERE id = $1 RETURNING *",
    [id])
    .then((data) => {
      if (data.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(data.rows[0]);
      }
    }).catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
