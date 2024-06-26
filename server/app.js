const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// MongoDB connection
const MONGO_URI = "mongodb://localhost:27017/cohort-tools-api";
const DB_NAME = "cohort-tools-api";
const MONGODB_STUD_URI = "mongodb://localhost/students";
const MONGODB_COHORT_URI = "mongodb://localhost/cohorts";
mongoose
  .connect(MONGO_URI)

  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// Cohort Model
const Cohort = require("./models/Cohort.model");

// Student Model
const Student = require("./models/Student.model");

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

// app.get("/api/cohorts", (req, res) => {
//   // res.json(require('/Users/jasperchang/Documents/Ironhack/ironhack-begin-2/week7/cohort-tools-project/server/cohorts.json'))
// });

// ...COHORT ROUTES

app.get("/api/cohorts", async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    next(error);
  }
});

app.get("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const oneCohort = await Cohort.findOne({ _id: cohortId });
    res.json(oneCohort);
  } catch (error) {
    res.sendStatus(500);
  }
});
app.post("/api/cohorts", async (req, res, next) => {
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  const cohortToCreate = {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  };
  const createdCohort = await Cohort.create(cohortToCreate);
  res.status(201).json(createdCohort);
  try {
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put("/api/cohorts/:cohortId", async (req, res, next) => {
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;
  const cohortToUpdate = {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  };
  const { cohortId } = req.params;
  const updatedCohort = await Cohort.findOneAndUpdate(
    { _id: cohortId },
    cohortToUpdate,
    { new: true }
  );
  res.status(202).json(updatedCohort);
  try {
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    await Cohort.findOneAndDelete({ _id: cohortId });
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});

// ...STUDENT ROUTES
app.get("/api/students", async (req, res, next) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// app.get('*', (req, res) => {
//   console.error(`Request for unknown route: ${req.originalUrl}`);
//   res.sendFile(path.join(__dirname, 'views', 'not-found.html'));
// });
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
