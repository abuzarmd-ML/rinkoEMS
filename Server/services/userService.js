// Import User model (assuming you're using an ORM like Sequelize)
import { User } from '../models/user.js';

// Service function to create a new user account
export const createUser = async (userName, email, password) => {
  // Perform data validation if needed (e.g., check for required fields, validate email format)

  // Create a new user record in the database
  const newUser = await User.create({ userName, email, password });

  // Return the newly created user object
  return newUser;
};
