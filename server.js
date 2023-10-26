const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const PORT = process.env.port || 8080;
const dbConfig = require(path.join(__dirname, "./configs/db.config"));
const createUser = require(path.join(
  __dirname,
  "./controllers/user.controller"
));

app.use(express.json());
app.use(cors()); //ACCESS from everywhere
app.use(express.static(path.join(__dirname, "/public")));

mongoose
  .connect(dbConfig.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/signUp", createUser.saveUser);
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
