const express = require("express");
const router = express.Router();
const Student = require("../models/Student.model");
const isAuth = require("../middleware/isAuth");
//! Prefixed with /api/students

router.get("/", async (req, res, next) => {
  try {
    console.log("Hello");
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.get("/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const oneStudent = await Student.findOne({ _id: studentId }).populate(
      "cohort"
    );
    res.json(oneStudent);
  } catch (error) {
    next(error);
  }
});
router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const students = await Student.find({ cohort: cohortId }).populate(
      "cohort"
    );
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuth, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects,
    } = req.body;

    const studentToCreate = {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects,
    };
    const createdStudent = await Student.create(studentToCreate);
    res.status(201).json(createdStudent);
  } catch (error) {
    next(error);
  }
});

router.put(":studentId", isAuth, async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  } = req.body;
  const studentToUpdate = {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  };
  const { studentId } = req.params;
  const updatedStudent = await Student.findOneAndUpdate(
    { _id: studenttId },
    studentToUpdate,
    { new: true }
  );
  res.status(202).json(updatedStudent);
  try {
  } catch (error) {
    next(error);
  }
});

router.delete("/:studentId", isAuth, async (req, res, next) => {
  git;
  try {
    const { studentId } = req.params;
    await Student.findOneAndDelete({ _id: studentId });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
