const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const app = express();
const PORT = 8000;
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

dotenv.config({
  path: "./config.env",
});

app.use(express.json());
app.use(cors());

// const students = [
//   {
//     id: 1,
//     name: "Paul",
//   },
//   {
//     id: 2,
//     name: "Bob",
//   },
//   {
//     id: 3,
//     name: "Michael",
//   },
// ];

// ROUTES

app.get("/", (_req, res) => {
  res.send("Students");
});

app.get("/students", async (_req, res) => {
  let students;
  try {
    students = await Postgres.query("SELECT * FROM students");
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "An error happened",
    });
  }

  res.json(students.rows);
  // res.json(students);
});

app.post("/students", async (req, res) => {
  try {
    await Postgres.query("INSERT INTO students(name, city) VALUES($1, $2)", [
      req.body.name,
      req.body.city,
    ]);
  } catch (err) {
    return res.status(400).json({
      message: "ERROR: Bad data received",
    });
  }

  res.json({
    message: `Student ${req.body.name} added to the database`,
  });
  // console.log(req.body);
  // students.push({
  //   id: students.length + 1,
  //   name: req.body.name,
  // });
  // res.send(students);
});

// ERROR
app.get("*", (req, res) => {
  res.status(404).send("Page not found - 404");
});

app.listen(PORT, () => console.log("Listening on PORT", PORT));
