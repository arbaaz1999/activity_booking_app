const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    dateTime: { type: Date, required: true, default: Date.now().toString() },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
