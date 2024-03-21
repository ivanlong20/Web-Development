import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "20010120",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];

async function checkVisited(id) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries where user_id=$1",
    [id]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  try {
    const resultUser = await db.query("SELECT * FROM users");
    users = resultUser.rows;
    console.log(users);
    const result = await db.query(
      "SELECT user_id, color, country_code FROM users JOIN visited_countries ON users.id=visited_countries.user_id WHERE users.id=$1;",
      [currentUserId]
    );
    console.log(result.rows);
    const countries = result.rows.map((obj) => obj.country_code);
    const color = users.find((user) => user.id == currentUserId).color;
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: color,
    });
  } catch (err) {
    console.log(err);
    res.render("index.ejs", {
      countries: null,
      total: 0,
      users: users,
      color: null,
    });
  }
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      (await checkVisited(currentUserId)).forEach((country) => {
        if (country === countryCode) {
          throw Error;
        }
      });
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
        [countryCode, currentUserId]
      );
      const result = await db.query(
        "SELECT user_id, color, country_code FROM users JOIN visited_countries ON users.id=visited_countries.user_id WHERE users.id=$1;",
        [currentUserId]
      );
      const countries = result.rows.map((obj) => obj.country_code);
      const color = users.find((user) => user.id == currentUserId).color;
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: color,
      });
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.post("/user", async (req, res) => {
  console.log(req.body.user);
  if (req.body.user !== undefined) {
    try {
      console.log(users);
      const id = req.body.user;
      currentUserId = id;
      const result = await db.query(
        "SELECT user_id, color, country_code FROM users JOIN visited_countries ON users.id=visited_countries.user_id WHERE users.id=$1;",
        [id]
      );
      console.log(result.rows);
      const countries = result.rows.map((obj) => obj.country_code);
      const color = users.find((user) => user.id == currentUserId).color;
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: color,
      });
    } catch (err) {
      console.log(err);
      res.render("index.ejs", {
        countries: null,
        total: 0,
        users: users,
        color: null,
      });
    }
  } else if (req.body.add === "new") {
    res.render("new.ejs");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  try {
    const result = await db.query(
      "INSERT INTO users(name,color) VALUES($1,$2) RETURNING id",
      [req.body.name, req.body.color]
    );
    users.push({
      id: result.rows[0].id,
      name: req.body.name,
      color: req.body.color,
    });
    console.log(users);
    currentUserId = result.rows[0].id;
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
