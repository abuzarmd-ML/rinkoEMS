// src/models/login.js

import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);

async function loginUser(username, password) {
  const connection = await pool.getConnection();
  console.log("DATABASE CONNECT: ", [username, password])
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    return rows.length ? rows[0] : null;
  } finally {
    connection.release();
  }
}

export { loginUser };
