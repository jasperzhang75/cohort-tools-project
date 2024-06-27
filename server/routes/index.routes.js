const router = require("express").Router();
//! Prefixed with /api

router.use("/cohorts", require("./cohorts.routes.js"));
router.use("/students", require("./students.routes.js"));

module.exports = router;
