const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

// Register a new user
router.post('/register', userController.register);

// Log in an existing user
router.post('/login', userController.login);

// Get user details by ID (no auth middleware here — consider adding if needed)
router.get('/:id', userController.getUserById);

module.exports = router;
