import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
  console.log(req.rawHeaders);
});

app.get("/contact", (req, res) => {
  res.send("Hi this is ivan");
});

app.get("/about", (req, res) => {
  res.send("cityu");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
