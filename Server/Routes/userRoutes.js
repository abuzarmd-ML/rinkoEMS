const express = require('express');
const router = express.Router();

// Import user controller and service
const UserController = require('../controllers/userController');
const UserService = require('../services/userService');

// Define route for user signup
router.post('/signup', async (req, res) => {
  try {
    // Extract form data from request body
    const { userName, email, password } = req.body;

    // Validate input data (e.g., check for required fields, validate email format)

    // Call service function to create new user account
    const newUser = await UserService.createUser(userName, email, password);

    // Send success response with newly created user object
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    // Handle errors (e.g., validation errors, database errors)
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

module.exports = router;
