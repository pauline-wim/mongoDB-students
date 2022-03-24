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

// GET all students
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

// CREATE student
app.post("/students", async (req, res) => {
  let student;
  try {
    student = await Students.create(req.body);
  } catch (err) {
    return res.status(400).json({
      message: "ERROR: Bad data received",
    });
  }
  res.json({
    message: `Student ${req.body.name} has been ADDED to the database`,
  });
});

// GET student by name
app.get("/students/:name", async (req, res) => {
  let student;
  try {
    student = await Students.findOne(
      {
        name:
          req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1),
      },
      "-__v"
    );
  } catch (err) {
    return res.status(404).json({
      message: `${err}`,
    });
  }
  if (student === null) {
    return res.status(400).json({
      message: "This student CANNOT be found in the database.",
    });
  }
  res.json(student);
});

// DELETE one student
app.delete("/students/:name", async (req, res) => {
  let student;
  try {
    student = await Students.findOneAndDelete({
      name: req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1),
    });
  } catch (err) {
    return res.status(400).json({
      message: "ERROR: Bad data received",
    });
  }

  res.json({
    message: `Student ${req.params.name} has been DELETED from the database`,
  });
});

// ERROR
app.get("*", (req, res) => {
  res.status(404).send("Page not found - 404");
});

app.listen(PORT, () => console.log("Listening on PORT", PORT));
