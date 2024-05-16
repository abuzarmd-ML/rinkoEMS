// src/models/User.js

import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);

// Define the createUser function
async function createEmployee(name,phone,country,dob,nie,caducidad,social_security,company_id,type,status,rate,reference,remarks,bank_name,iban) {
  const connection = await pool.getConnection();
  try {
    console.log("User info:",[name,phone,country,dob,nie,caducidad,social_security,type,status,rate,reference,remarks,bank_name,iban,company_id])
    const [result] = await connection.execute(
      'INSERT INTO employee (name, phone,country,dob,nie,caducidad,social_security,type,status, rate,reference,remarks,bank_name,iban,company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, phone,country,dob,nie,caducidad,social_security,type,status, rate,reference,remarks,bank_name,iban,company_id]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}

// Export the createUser function as a named export
export { createEmployee };
