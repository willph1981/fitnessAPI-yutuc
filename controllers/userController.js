const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../auth");

// Register User
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);
    res.status(201).json({ token, userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = generateToken(user._id);
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); 
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { registerUser, loginUser, getUserDetails };
