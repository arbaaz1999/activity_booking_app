const Activity = require("../models/activityModel");

exports.createActivity = async (req, res) => {
  try {
    const { title, description, location, dateTime } = req.body;

    const activity = new Activity({ title, description, location, dateTime });
    await activity.save();

    res
      .status(201)
      .json({ message: "Activity created successfully", activity });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
