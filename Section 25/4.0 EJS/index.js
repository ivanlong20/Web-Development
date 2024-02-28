import express from "express";

const app = express();
const port = 3000;
var currentDay = 2;
var weekday = currentDay === 0 || currentDay === 6 ? "Weekend" : "Weekday";

console.log(weekday);

// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(weekday);
  res.render("view.ejs", { day: weekday });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
