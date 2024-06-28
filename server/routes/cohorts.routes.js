const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model");
const isAuth = require("../middleware/isAuth");
//! Prefixed with /api/cohorts

router.get("/", async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    next(error);
  }
});

router.get("/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const oneCohort = await Cohort.findOne({ _id: cohortId });
    res.json(oneCohort);
  } catch (error) {
    next(error);
  }
});
router.post("/", isAuth, async (req, res, next) => {
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
    next(error);
  }
});

router.put("/:cohortId", isAuth, async (req, res, next) => {
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
    next(error);
  }
});

router.delete("/:cohortId", isAuth, async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    await Cohort.findOneAndDelete({ _id: cohortId });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
