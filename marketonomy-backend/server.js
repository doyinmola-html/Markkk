const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Temporary hardcoded config (we'll move back to .env after fixing)
const CONFIG = {
  PORT: 5000,
  MONGO_URI: 'mongodb+srv://marketonomy_admin:MARKETONOMY@cluster0.gxfjbnc.mongodb.net/?appName=Cluster0',
  EMAIL_USER: 'marketonomyorganisation@gmail.com',
  EMAIL_PASS: 'eytybdiitoqwirep',  
  NOTIFY_EMAIL: 'marketonomyorganisation@gmail.com'
};

// Make it available like process.env
process.env.PORT = CONFIG.PORT;
process.env.MONGO_URI = CONFIG.MONGO_URI;
process.env.EMAIL_USER = CONFIG.EMAIL_USER;
process.env.EMAIL_PASS = CONFIG.EMAIL_PASS;
process.env.NOTIFY_EMAIL = CONFIG.NOTIFY_EMAIL;

// Routes
app.use('/api', require('./routes/register'));
app.use('/api', require('./routes/login'));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ DB connection error:', err));