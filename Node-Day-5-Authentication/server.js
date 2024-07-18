const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environemnt variables from .env files
dotenv.config();

const app = express();
// Use the cors middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    ``;
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
console.log("process.env.MONGO_URI", process.env.MONGO_URI);
// use Routes
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
console.log("process.env.PORT", process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
