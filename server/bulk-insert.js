import { faker } from "@faker-js/faker";
import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: "../.env" });

const DATA_FILENAME = "data.csv";
const ROW_COUNT = 1_000;

// Connect to database
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});
await client.connect();

// TODO: Replace "tasks" with the table you want to bulk-insert into.
await client.query(`DELETE FROM tasks`);

const writableStream = fs.createWriteStream(DATA_FILENAME);

for (let i = 0; i < ROW_COUNT; i++) {
  // TODO: Generate fake data for your table and write it to the stream in csv format.
  const description = faker.lorem.words();
  const priority = faker.number.int({ min: 1, max: 3 });

  await new Promise((resolve, reject) => {
    writableStream.write(`${description}, ${priority}\n`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

writableStream.close();

// Get absolute filepath of the data file where we dumped our data.
const cwd = path.dirname(fileURLToPath(import.meta.url));
const dataFilepath = path.join(cwd, DATA_FILENAME);

// TODO: Change "tasks" with the name of the table you want to insert into.
//   Also, make sure the columns defined match the number and order of columns
//   you dumped into your .csv file.
await client.query(
  `COPY tasks (description, priority) FROM '${dataFilepath}' WITH DELIMITER ',' CSV`
);

client.end();