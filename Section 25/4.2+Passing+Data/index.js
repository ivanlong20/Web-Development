import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let numLetter = 0;

app.use(bodyParser.urlencoded({ extended: true }));

function getLetter(name) {
  numLetter = name.length;
}

app.get("/", (req, res) => {
  res.render("index.ejs", { num: numLetter });
});

app.post("/submit", (req, res) => {
  getLetter(req.body.fName + req.body.lName);
  res.render("index.ejs", { num: numLetter });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
