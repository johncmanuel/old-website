const CronJob = require("cron").CronJob;
const axios = require("axios");
const dotenv = require("dotenv").config();
const pool = require("./db");

const api_site = process.env.API_SITE || "http://localhost:3000/api/";
const api_books = api_site + process.env.API_BOOKS;
const api_repos = api_site + process.env.API_REPOS;

/**
 * Mimicks the zip function from Python.
 *
 * Source: https://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function
 *
 * @param args Array(s)
 * @return     Array of arrays
 */
function zip() {
  var args = [].slice.call(arguments);
  var shortest =
    args.length == 0
      ? []
      : args.reduce(function (a, b) {
          return a.length < b.length ? a : b;
        });

  return shortest.map(function (_, i) {
    return args.map(function (array) {
      return array[i];
    });
  });
}

/**
 * Get data from personal website and insert it in database.
 *
 * @param target String containing website link with /api/goodreads/books attached.
 */
function getBooks(target) {
  axios
    .get(target)
    // Get data if response is successful
    .then((response) => {
      const data = response.data;
      console.log(data);

      // Get array of data from each element in the data and
      // merge them together in an array of arrays via zip().
      // Outcome:
      // const rows = [ [title[0], author[0], date_read[0]], [...], [...], [title[n], author[n], data_read[n] ]
      const title = data.map((item) => item.title);
      const author = data.map((item) => item.author);
      const date_read = data.map((item) => item.date_read);
      const rows = zip(title, author, date_read);

      /* ------------------------------------------------- */
      /*                  Database Queries                 */
      /* ------------------------------------------------- */

      /**
       * Order of sequence for querying database:
       *
       * 1. Delete all records
       * 2. Create the table if it doesn't exist
       * 3. Insert data prepared in advance into table
       * 4. Release connection
       */

      // Delete all records
      // This is my way of updating for now
      pool.query("TRUNCATE TABLE books_2", (error) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log("Records deleted");

        // Create table if not exists
        pool.query(
          `CREATE TABLE IF NOT EXISTS books_2 (
                                id INT PRIMARY KEY AUTO_INCREMENT,
                                title TEXT NOT NULL,
                                author TEXT NOT NULL, 
                                date_read TEXT NOT NULL
                            )`,
          (error) => {
            if (error) {
              console.error(error);
              return;
            }
            console.log("Table created");

            // Insert data into table 'books'
            pool.query(
              `INSERT IGNORE INTO books_2 (title, author, date_read) VALUES ?  `,
              [rows],
              (error, results) => {
                if (error) {
                  console.error(error);
                  return;
                }
                console.log("Row(s) inserted: " + results.affectedRows);

                // Insert data into books from books_2
                pool.query(
                  `REPLACE INTO books SELECT * FROM books_2`,
                  (error) => {
                    console.error(error);
                    return;
                  }
                );
                console.log(`Executed 'replaced into' query`);
              }
            );
          }
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Get data from personal website and insert it in database.
 *
 * @param target String containing website link with /api/github/repos attached.
 */
function getRepos(target) {
  axios
    .get(target)
    .then((response) => {
      const data = response.data;
      console.log(data);

      const title = data.map((item) => item.title);
      const details = data.map((item) => item.details);
      const date_created = data.map((item) => item.date_created);
      const stars = data.map((item) => item.stars);
      const language = data.map((item) => item.lang);
      const link = data.map((item) => item.link);

      const rows = zip(title, details, date_created, stars, language, link);

      /* ------------------------------------------------- */
      /*                  Database Queries                 */
      /* ------------------------------------------------- */

      /**
       * Order of sequence for querying database:
       *
       * 1. Delete all records
       * 2. Create the table if it doesn't exist
       * 3. Insert data prepared in advance into table
       * 4. Release connection
       */

      // Delete all records
      // This is my way of updating for now
      pool.query("TRUNCATE TABLE repos_2", (error) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log("Records deleted");

        // Create table if not exists
        pool.query(
          `CREATE TABLE IF NOT EXISTS repos_2 (
                                id              INT PRIMARY KEY AUTO_INCREMENT,
                                title           TEXT NOT NULL,
                                details         TEXT NOT NULL,
                                date_created    TEXT NOT NULL,
                                stars           INT NOT NULL,
                                lang            TEXT NOT NULL,
                                link            TEXT NOT NULL
                            )`,
          (error) => {
            if (error) {
              console.error(error);
              return;
            }
            console.log("Table created");

            // Insert data into table 'repos_2'
            pool.query(
              `INSERT IGNORE INTO repos_2 (title, details, date_created, stars, lang, link) VALUES ?  `,
              [rows],
              (error, results) => {
                if (error) {
                  console.error(error);
                  return;
                }
                console.log("Row(s) inserted: " + results.affectedRows);

                // Insert data into books from books_2
                pool.query(
                  `REPLACE INTO repos SELECT * FROM repos_2`,
                  (error) => {
                    console.error(error);
                    return;
                  }
                );
                console.log(`Executed 'replaced into' query`);
              }
            );
          }
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// Run job every 10 minutes
console.log("Before job initialization");
const job = new CronJob(
  "0 0 */1 * * *",
  () => {
    const d = new Date();
    console.log("Every hour: ", d);
    getBooks(api_books);
    getRepos(api_repos);
  },
  null,
  "America/Los_Angeles"
);

console.log("After job initialization");
job.start();
