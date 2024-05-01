import express from 'express'
const router = express.Router();

import * as UserService from '../services/userService.js'

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

router.get('/signup', async (req, res) => {
  return res.status(200).json({ message: 'Error creating user' });
})

export {router as userRoute}
