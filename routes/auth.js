// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const OTP_LENGTH = 6; // Length of OTP

router.get("/", (req, res) => {
  return res.status(200).json({ msg: "API working..." });
});

// POST /api/register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP via email
    await sendEmail(email, otp.toString());

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password and the otp generated
    // this otp will be used for email verification
    user = new User({
      email,
      password: hashedPassword,
      otp,
    });

    await user.save();

    res.status(201).json({
      msg: "User registered successfully, but unverified. Please use /verify to verify the email.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST /api/verify
router.post("/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find user by email and OTP
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res
        .status(403)
        .json({ msg: "Invalid OTP or email is not registered" });
    }

    // Mark user as verified and save the user
    user.isVerified = true;
    await user.save();

    res.status(202).json({
      msg: "Account verified successfully. You can proceed to profile addition.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// POST /api/login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: 'User does not exist' });
      }
  
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: 'Invalid credentials' });
      }
  
      // Check if user is verified
      if (!user.isVerified) {
        return res.status(400).json({ msg: 'Account not verified' });
      }
  
      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 }, // Token expires in 1 hour
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
