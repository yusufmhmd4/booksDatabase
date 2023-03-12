const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbpath = path.join(__dirname, "goodreads.db");
let db = null;

const initializeDatabaseAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("RUNNER");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
    process.exit(1);
  }
};
initializeDatabaseAndServer();
app.get("/author/books", async (request, response) => {
  const arrayCommond = `
    SELECT * FROM book ORDER BY book_id`;
  const booksArray = await db.all(arrayCommond);
  response.send(booksArray);
});
