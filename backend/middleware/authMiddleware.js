// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// ✅ Auth Protection
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// ✅ Admin Only Middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};

module.exports = { protect, adminOnly };



