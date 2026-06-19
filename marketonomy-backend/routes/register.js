const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { sendRegistrationAlert } = require('../mailer');

// User Schema
const userSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  role:      { type: String, enum: ['student', 'mentor'], required: true },
  skill:     { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

router.post('/register', async (req, res) => {
  console.log('📥 Register request received:', req.body);
  const { name, email, pass, role, skill } = req.body;
  
  try {
    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Save new user
    const user = new User({ name, email: email.toLowerCase(), password: pass, role, skill });
    await user.save();

    // Send email notification (non-blocking)
    sendRegistrationAlert({ name, email, role, skill })
      .catch(err => console.error('Email notification failed:', err.message));

    res.status(201).json({ message: 'Registration successful', user: { name, email, role, skill } });

  } catch (err) {
    console.error('REGISTRATION ERROR:', err.message);
    console.error('FULL ERROR:', err);
    res.status(500).json({ error: 'Server error during registration.', details: err.message });
  }
});

module.exports = router;