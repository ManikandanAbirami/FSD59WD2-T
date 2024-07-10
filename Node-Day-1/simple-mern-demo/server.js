const express = require("express");
const app = express();
const cors = require("cors");

// Use the cors middleware
app.use(cors());

app.get("/greet", function (req, res) {
  res.send("Hello, Manikandan Anbalagan!!!");
});

app.get("/api/greeting", (req, res) => {
  res.json({ message: "Hello World, from node server!!!" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
