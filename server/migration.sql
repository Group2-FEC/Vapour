DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
  id SERIAL,
  description TEXT
);

INSERT INTO tasks(description) VALUES('Do the dishes');
INSERT INTO tasks(description) VALUES('Walk the dog');
INSERT INTO tasks(description) VALUES('Sweep the floor');
INSERT INTO tasks(description) VALUES('Do your homework');
INSERT INTO tasks(description) VALUES('Beat Elden Ring');
