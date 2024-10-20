const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Ensure this path is correct
require('dotenv').config();  // Load environment variables

exports.protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');  // Redirect to login if no token is found
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);  // Attach user data to the request object
    next();
  } catch (err) {
    return res.status(401).send('Not authorized');
  }
};
