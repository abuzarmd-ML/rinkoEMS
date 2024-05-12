// loginController.js

import { loginUser } from '../models/login.js';
import createToken from '../utils/createToken.js';

export async function login(req, res) {
  try {
    const { username, password, company } = req.body;
    console.log("[Controller]: ",[ username, password, company])
    // Authenticate user
    const user = await loginUser(username, password);
    console.log("[Controller]: ",user)
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Check user role and company access
    if (user.role_id === 'superadmin' || hasCompanyAccess(user.role_id, company)) {
      // Set user session or token
    //   req.session.user = user;

      const token = createToken(user.id,company,user.role_id)
      console.log("TOKEN : ",token)
    
      return res.status(200).json({ message: 'Login successful', loginStatus: 'True' ,user });
    } else {
      return res.status(403).json({ error: 'Unauthorized access to company' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
}

function hasCompanyAccess(role, company) {
  // Implement logic to check if the user role has access to the specified company
  // For demonstration purposes, assume all users have access to all companies
  return true;
}
