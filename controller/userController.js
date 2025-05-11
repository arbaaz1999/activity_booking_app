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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({
          status: "OK",
          message: "Login successful",
          result: { token, user },
        });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // Get user profile
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // Update user profile
  updateProfile: async (req, res) => {
    const { name, email, phoneNumber } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, email, phoneNumber },
        { new: true, runValidators: true }
      ).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // Delete user account
  deleteAccount: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
      console.error("Error deleting user account:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = userController;
