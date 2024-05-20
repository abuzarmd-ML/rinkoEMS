// models/company.js
import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);

export async function getAllCompanies() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute('SELECT company_id, name FROM companies');
    return rows;
  } finally {
    connection.release();
  }
}
