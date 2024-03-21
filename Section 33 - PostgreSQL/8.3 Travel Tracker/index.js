import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

let country_codes, all_country_codes;

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

app.post("/add", async (req, res) => {
  const inputResult = await db.query(
    "SELECT country_code from countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
    [req.body.country.toLowerCase()]
  );
  console.log(req.body.country);
  var result = await db.query("SELECT country_code FROM visited_countries");
  country_codes = result.rows.map((obj) => obj.country_code);

  console.log(inputResult.rows);

  if (inputResult.rows.length > 0) {
    const country = inputResult.rows.map((obj) => obj.country_code)[0];
    const allResult = await db.query("SELECT country_code FROM countries");
    var isDuplicated = false;
    all_country_codes = allResult.rows.map((obj) => obj.country_code);

    all_country_codes.forEach((all_code) => {
      if (all_code === country) {
        country_codes.forEach((code) => {
          if (code === country) {
            isDuplicated = true;
          }
        });
      }
    });

    if (isDuplicated) {
      res.render("index.ejs", {
        countries: country_codes,
        total: country_codes.length,
        isDuplicated: isDuplicated,
      });
    } else {
      db.query("INSERT INTO visited_countries(country_code) VALUES($1)", [
        country,
      ]);
      res.redirect("/");
    }
  } else {
    res.render("index.ejs", {
      countries: country_codes,
      total: country_codes.length,
      exist: false,
    });
  }

  console.log(isDuplicated);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
