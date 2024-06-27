const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 5005;
const { errorHandler, notFoundHandler } = require("./middleware/errorHandling");
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express

// MIDDLEWARE

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", require("./routes/index.routes"));

app.use(notFoundHandler);
app.use(errorHandler);
// MongoDB connection
const MONGO_URI = "mongodb://localhost:27017/cohort-tools-api";
mongoose
  .connect(MONGO_URI)

  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
