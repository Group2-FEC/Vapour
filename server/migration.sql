DROP TABLE IF EXISTS videogames;

CREATE TABLE videogames (
  id SERIAL PRIMARY KEY,
  name TEXT,
  background_image TEXT,
  esrb_rating TEXT,
  released TEXT,
  rating INT
);

INSERT INTO videogames(name, background_image, esrb_rating, released, rating) VALUES('Halo', 'https://media.rawg.io/media/screenshots/aac/aaccfdc54ef56523e18337a3cfae7d7f.jpg', 'Mature', '2001-11-15', '4');