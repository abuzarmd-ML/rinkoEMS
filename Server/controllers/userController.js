// userController.js

import { createUser } from '../models/user.js'; // Import the createUser function

export async function signup(req, res) {
  try {
    const { username, email, password, role } = req.body; // Extract form data
    console.log("Here is the submitted value from signup form: ", req.body)
    const userId = await createUser(username, email, password, role); // Use createUser function with extracted data
    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}
