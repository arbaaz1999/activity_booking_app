const {
  bookActivity,
  getMyBookings,
} = require("../controller/bookingController");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/book", auth, bookActivity);
router.get("/my-bookings", auth, getMyBookings);

module.exports = router;
