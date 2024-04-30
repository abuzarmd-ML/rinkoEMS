// Import user service
const UserService = require('../services/userService');

// Controller function for handling user signup
exports.signupUser = async (req, res) => {
  try {
    // Extract form data from request body
    const { userName, email, password } = req.body;

    // Call service function to create new user account
    const newUser = await UserService.createUser(userName, email, password);

    // Send success response with newly created user object
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    // Handle errors (e.g., validation errors, database errors)
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};
