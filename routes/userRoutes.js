const express = require("express");
const userController = require("../controller/userController");
const { validateUserRequest } = require("../middlewares/validator");

const router = express.Router();
// User registration route
router.post("/create", validateUserRequest, userController.register);

// User login route
router.post("/login", userController.login);

// Get user profile
router.get("/profile", userController.getProfile);

// Update user profile
router.put("/profile", userController.updateProfile);

// Delete user account
router.delete("/delete", userController.deleteAccount);

module.exports = router;
