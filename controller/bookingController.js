const Booking = require("../models/BookingModel");
const Activity = require("../models/ActivityModel");

exports.bookActivity = async (req, res) => {
  try {
    const { activityId } = req.body;
    const activity = await Activity.findById(activityId);
    if (!activity) return res.status(404).json({ error: "Activity not found" });

    const booking = new Booking({ user: req.user.id, activity: activityId });
    await booking.save();

    res.status(201).json({ message: "Activity booked successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      "activity title description location dateTime"
    );
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
