import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

let country_codes;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "20010120",
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("SELECT country_code FROM visited_countries");
  console.log(result);
  country_codes = result.rows.map((obj) => obj.country_code);

  res.render("index.ejs", {
    countries: country_codes,
    total: country_codes.length,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
