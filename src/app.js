require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();


app.use(express.json());
// app.use(passport.initialize());
// require('./config/passport');

app.use('/api/auth', authRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT || 5000, () => 
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();