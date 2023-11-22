DROP TABLE IF EXISTS videogames;

CREATE TABLE videogames (
  id SERIAL PRIMARY KEY,
  name TEXT,
  age_rating TEXT,
  genre TEXT,
  rating INT
);

INSERT INTO videogames(name, age_rating, genre, rating) VALUES('Halo', 'M', 'FPS', '92');