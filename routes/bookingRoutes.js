const {
  bookActivity,
  getMyBookings,
} = require("../controller/bookingController");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.use(auth);
router.post("/book", bookActivity);
router.get("/my-bookings", getMyBookings);

module.exports = router;
