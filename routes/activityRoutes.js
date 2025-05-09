const {
  createActivity,
  getAllActivities,
} = require("../controller/activityController");
const express = require("express");

const router = express.Router();
const auth = require("../middlewares/auth");
const { validateActivityRequest } = require("../middlewares/validator");

router.post("/create", auth, validateActivityRequest, createActivity);
router.get("/all", getAllActivities);

module.exports = router;
