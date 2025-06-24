// backend/routes/auth.js
const express = require('express');
const router = express.Router();

// Import controller functions
const { registerUser, loginUser } = require('../controllers/authController');

// Auth Routes
// POST /api/auth/signup - Register a new user
router.post('/signup', registerUser);

// POST /api/auth/login - Log in an existing user
router.post('/login', loginUser);

// Optionally, you could add validation middleware here:
// e.g., router.post('/signup', validateSignup, registerUser);

module.exports = router;
