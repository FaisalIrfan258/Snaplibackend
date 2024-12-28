// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const passport = require('passport');


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    authController.googleAuthSuccess
  );
  
module.exports = router;