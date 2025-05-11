const express = require("express");
const userController = require("../controller/userController");
const { validateUserRequest } = require("../middlewares/validator");

const router = express.Router();
// User registration route
router.post("/create", validateUserRequest, userController.register);

// User login route
router.post("/login", userController.login);

module.exports = router;
