const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  name:     String,
  email:    String,
  password: String,
  role:     String,
  skill:    String,
}));

router.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase(), password: pass });
    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email, role: user.role, skill: user.skill } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

module.exports = router;