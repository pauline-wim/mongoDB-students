const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Students = require("./models/studentsModel");
const app = express();
const PORT = 8000;

dotenv.config({
  path: "./config.env",
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database mongoDB running"));

app.use(express.json());
app.use(cors());

// ROUTES

app.get("/", (_req, res) => {
  res.send("Students");
});

app.get("/students", async (_req, res) => {
  let students;
  try {
    students = await Students.find().select("-__v");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: `Error occured: ${err}`,
    });
  }
  res.json(students);
});

app.post("/students", async (req, res) => {
  let students;
  try {
    students = await Students.create(req.body);
  } catch (err) {
    return res.status(400).json({
      message: "ERROR: Bad data received",
    });
  }
  res.json({
    message: `Student ${req.body.name} added to the database`,
  });
});

// ERROR
app.get("*", (req, res) => {
  res.status(404).send("Page not found - 404");
});

app.listen(PORT, () => console.log("Listening on PORT", PORT));
