// src/models/User.js

import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);

// Define the createUser function
async function createUser(userName, email, password, role_id) {
  const connection = await pool.getConnection();
  try {
    console.log("User info:",[userName, email, password, role_id])
    const [result] = await connection.execute(
      'INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)',
      [userName, email, password, role_id]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}

// Export the createUser function as a named export
export { createUser };
