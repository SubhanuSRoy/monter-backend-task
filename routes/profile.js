const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST /profile/addInfo
router.post('/addInfo', async (req, res) => {
  try {
    const { email, location, age, workDetails } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if user is verified
    if(user.isVerified === false) {
      return res.status(401).json({ msg: 'User is not verified' });
    }
    
    // Update user's information
    user.location = location;
    user.age = age;
    user.workDetails = workDetails;
    await user.save();

    res.status(200).json({ msg: 'Additional information updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
