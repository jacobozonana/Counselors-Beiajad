const express = require("express");
const app = express();
const cors = require("cors");
const config = require("../config");
const mongoose = require("mongoose");

// SET HERE YOUR CORS POLICY
// IT'S SET TO PUBLIC
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

mongoose
  .connect(config.db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error on connection", err));

app.get("/", (req, res) => {
  res.json({ message: "OK" });
});
app.use("/api/v1", require("../routes"));

module.exports = { app };
