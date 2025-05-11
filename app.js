const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./configs/db"); // Import the database connection module
const userRoutes = require("./routes/userRoutes"); // Import user routes
const activityRoutes = require("./routes/activityRoutes"); // Import activity routes
const bookingRoutes = require("./routes/bookingRoutes"); // Import booking routes
const errorHandler = require("./middlewares/errorhandler");

dbConnection(); // Call the function to establish the database connection

const app = express();

// Middleware to parse JSON data (API requests)
app.use(express.json());
// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));
// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: "*", // Allow all origins (you can specify a specific origin if needed)
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the API!"); // Send a welcome message for the root route
});

// Use the user routes for any requests to /v1/users
app.use("/v1/users", userRoutes);
// Adding the activity routes to the app
app.use("/v1/activities", activityRoutes); // Use the activity routes for any requests to /v1/activities
// Adding the booking routes to the app
app.use("/v1/bookings", bookingRoutes); // Use the booking routes for any requests to /v1/bookings

// Middleware to handle errors (should be the last middleware in the stack)
app.use(errorHandler);

module.exports = app; // Export the Express app for use in other files (e.g., server.js)
