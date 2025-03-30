const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Register User with Email Verification
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user object (but do not save it yet)
  const user = new User({ email, password });

  // Generate a verification token
  const verificationToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  user.verificationToken = verificationToken;

  // Prepare the email transporter and email options
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking the following link: ${process.env.BASE_URL}/api/auth/verify-email/${verificationToken}`,
  };

  // Try sending the email
  transporter.sendMail(mailOptions, async (err, info) => {
    if (err) {
      console.error("Error sending email:", err);  // Log the error
      return res.status(500).json({ message: 'Error sending email' });
    }

    // Only save the user if the email was sent successfully
    try {
      await user.save();  // Save the user only if email is sent successfully
      console.log("Email sent:", info);
      res.status(201).json({ message: 'Registration successful. Please check your email to verify your account.' });
    } catch (saveErr) {
      console.error("Error saving user:", saveErr);  // Log any save errors
      res.status(500).json({ message: 'Error saving user' });
    }
  });
};

// Login User and Generate JWT Token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.isVerified) {
    return res.status(400).json({ message: 'Invalid email or unverified account' });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token using the utility function
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};

// Verify Email
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email, verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = null; // Clear verification token
    await user.save();

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying email' });
  }
};

module.exports = { registerUser, loginUser, verifyEmail };  // Export the functions
