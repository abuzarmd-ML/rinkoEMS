// models/company.js
import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);

async function createCompany(name,address,encargar,status) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      'INSERT INTO companies (name,address,encargar,status) VALUES (?, ?, ?, ?)',
      [name,address,encargar,status]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}

async function getCompanyName() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute('SELECT company_id, name FROM companies');
    return rows;
  } finally {
    connection.release();
  }
}

export {createCompany,getCompanyName}