const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = (req, res, next) => {
  let token;

  // Check for token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Extract token from header
  }

  // If no token is found
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Using the JWT secret to verify the token
    req.user = decoded;  // Attach user data to the request object (user ID, role, etc.)
    next();  // Pass control to the next middleware or route handler
  } catch (error) {
    // If token is invalid
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };
