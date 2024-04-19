const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/user');

// GET /jwt/user
router.get('/user', auth, async (req, res) => {
  try {
    // Get user information from database based on user id stored in req.user
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
