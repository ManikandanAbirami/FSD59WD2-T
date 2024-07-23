const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/emailService");
const dotenv = require("dotenv");

// Load environemnt variables from .env files
dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  const user = new User({ username, password, role });
  await user.save();

  // Send Registration successful email
  const message = `<h1>Welcome, ${user.username}!</h1> <p>Your registration was successful.</p><br><p>Thank you for registering with us.</p>`;
  await sendEmail({
    email: user.username,
    subject: "Registration Successful",
    message,
  });
  res.json({
    _id: user._id,
    username: user.username,
    role: user.role,
    token: generateToken(user),
  });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user),
    });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
    throw new Error("Invalid username or password");
  }
};
