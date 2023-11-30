DROP TABLE IF EXISTS videogames;

CREATE TABLE videogames (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  background_image TEXT NOT NULL,
  esrb_rating TEXT,
  released TEXT NOT NULL,
  rating DECIMAL(3, 2) NOT NULL
);

INSERT INTO videogames(name, background_image, esrb_rating, released, rating) VALUES('Halo', 'https://media.rawg.io/media/screenshots/aac/aaccfdc54ef56523e18337a3cfae7d7f.jpg', 'Mature', '2001-11-15', '4');
INSERT INTO videogames(name, background_image, esrb_rating, released, rating) VALUES('Halo 2', 'https://media.rawg.io/media/games/3bf/3bfc3bd9fda76bf83f6cf1d788e1c7c7.jpg', 'Mature', '2004-11-09', '4.38');