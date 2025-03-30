const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',  // Token expires in 1 hour
  });
};

module.exports = { generateToken };
