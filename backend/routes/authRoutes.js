const express = require('express');
const { registerUser, loginUser, verifyEmail } = require('../controllers/authController');  // Ensure correct import path

const router = express.Router();

// Route for registering a new user
router.post('/register', registerUser);

// Route for logging in a user
router.post('/login', loginUser);


// Route for verifying email after registration
router.get('/verify-email/:token', verifyEmail);

module.exports = router;
