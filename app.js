const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./configs/db"); // Import the database connection module
const userRoutes = require("./routes/userRoutes"); // Import user routes
const errorHandler = require("./middlewares/errorhandler");

dbConnection(); // Call the function to establish the database connection

const app = express();
const PORT = process.env.PORT || 8080;

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

// Use the user routes for any requests to /api/users
app.use("/v1/users", userRoutes);
// Middleware to handle errors (should be the last middleware in the stack)
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) throw Error(err.message);
  console.log(`Application is successfully running on PORT ------> ${PORT}`);
});
