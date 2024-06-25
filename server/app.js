const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 5005;
const cors = require("cors");

const mongoose = require("mongoose");
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "cohort-tools-api";

mongoose
  .connect("mongodb://localhost:27017//cohort-tools-api")

  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express

// Cohort Model

// Student Model

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/api/cohorts", (req, res) => {
  // res.json(require('/Users/jasperchang/Documents/Ironhack/ironhack-begin-2/week7/cohort-tools-project/server/cohorts.json'))
});

app.get("/api/students", (req, res) => {
  // res.json(require('/Users/jasperchang/Documents/Ironhack/ironhack-begin-2/week7/cohort-tools-project/server/students.json'))
});

// app.get('*', (req, res) => {
//   console.error(`Request for unknown route: ${req.originalUrl}`);
//   res.sendFile(path.join(__dirname, 'views', 'not-found.html'));
// });

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
