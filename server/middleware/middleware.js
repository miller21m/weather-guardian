const jwt = require('jsonwebtoken');

// Middleware to verify JWT and attach user info to the request
exports.authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];

  // Extract token from "Bearer <token>" format
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token){
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  try {
    // Verify token and attach decoded user info to request object
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};
