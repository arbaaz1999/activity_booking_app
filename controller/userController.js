const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const userController = {
  // Register a new user
  register: async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    try {
      const existingUser = await User.find({ email });
      if (existingUser.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }
      const newUser = new User({ name, email, phoneNumber, password });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // Login user
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.find({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({
        status: "OK",
        message: "Login successful",
        result: { token, user },
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = userController;
