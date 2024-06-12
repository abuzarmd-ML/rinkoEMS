// models/company.js
import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);

async function createClient(name, phone, country, nie, address, company_id, dob, email,status, note) {
  const connection = await pool.getConnection();
  try {
    console.log("[MODEL]:", name, address, status);

    const fields = [name, phone, country, nie, address, company_id, dob, email,status, note].map(field => field === undefined ? null : field);

    const [result] = await connection.execute(
      'INSERT INTO companies (name, phone, country, nie, address, company_id, dob, email,status, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      fields
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}

async function getClinetName() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM clients');
    return rows;
  } finally {
    connection.release();
  }
}

async function getAllClient() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM clients');
    return rows; // Return the first (and presumably only) row
  } finally {
    connection.release();
  }
}

async function updateClient(id, companyData) {
  const connection = await pool.getConnection();
  try {
    const {name, phone, country, nie, caducidad, company_id, city, email, system_date, address, status, pincode } = companyData;
    const [result] = await connection.execute(
      `UPDATE company 
       SET name = ?, phone = ?, country = ?, city = ?, nie = ?, caducidad = ?, system_date = ?, company_id = ?, email = ?, status = ?, pincode = ?, address = ?
       WHERE company_id = ?`,
      [name, phone, country, nie, caducidad, company_id, city, email, system_date, address, status, pincode]
    );
    return result;
  } finally {
    connection.release();
  }
}
async function deleteClientById(companyId) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      'DELETE FROM companies WHERE company_id = ?',
      [companyId]
    );
    return result.affectedRows > 0;
  } finally {
    connection.release();
  }
}

export {createClient,getAllClient,getClinetName,deleteClientById,updateClient}

