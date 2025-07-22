const User = require("../models/user.model");
const Redis = require("ioredis");
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

const bcrypt = require("bcryptjs");
const { getJwtToken } = require("../helpers/userHelpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }
    const accessToken = getJwtToken(user);

    res.json({
      accessToken: accessToken,
      success: true,
      message: "Login successful.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required.",
    });
  }
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use." });
    }
    // Create new user
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    // Support id from URL params or query string
    const userId = req.query.id;

    if (userId) {
      const redisKey = `user:${userId}`;
      // Try to get cached value
      const cached = await redis.get(redisKey);
      if (cached) {
        return res.json({ success: true, user: JSON.parse(cached) });
      }
      // Fetch from DB
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      // Cache the result
      await redis.set(redisKey, JSON.stringify(user));
      return res.json({ success: true, user });
    } else {
      // No id provided, fetch all users
      const users = await User.find().select("-password");
      return res.json({ success: true, users });
    }
  } catch (error) {
    console.error("Error fetching user(s):", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const redisKey = `user:${userId}`;
    const updateData = { ...req.body };

    delete updateData.email;
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data to update" });
    }

    let user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Update cache
    await redis.set(redisKey, JSON.stringify(user));
    res.json({ success: true, message: "User updated!", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addCredits = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Successfully credits added.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getUsers, updateUser, login, signup, addCredits };
