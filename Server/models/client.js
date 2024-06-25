// models/company.js
import mysql from 'mysql2/promise';
import config from '../config/database.js';


const pool = mysql.createPool(config);

async function createClient(name, phone, email, company, dob, country, address, nie, status, client_id, note) {
  const connection = await pool.getConnection();
  try {
    console.log("[MODEL]:", name, address, status);

    // Extract the actual value from the company object
    const companyLabel = company && company.label ? company.label : null;

    // Ensure all fields are properly formatted
    const fields = [
      name || null,
      phone || null,
      email || null,
      companyLabel,
      dob || null,
      country || null,
      address || null,
      nie || null,
      status || null,
      client_id || null,
      note || null
    ];

    // Log the fields array to debug
    console.log("Fields array:", fields);

    const [result] = await connection.execute(
      'INSERT INTO clients (name, phone, email, company, dob, country, address, nie, status, client_id, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      fields
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}



async function getClientName() {
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

async function getClientById(clientId) {

  console.log("Executing query to fetch client with ID:", clientId);
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM clients WHERE client_id = ?',
      [clientId]
    );
    console.log(clientId,rows)
    return rows[0];
  } finally {
    connection.release();
  }
}

async function updateClient(id, clientData) {
  const connection = await pool.getConnection();
  try {
    const { name, phone, email, company, dob, country, address, nie, status, note } = clientData;
    
    // Check if all fields are present
    if ([name, phone, email, company, dob, country, address, nie, status, note].includes(undefined)) {
      throw new Error("Missing required fields in clientData");
    }

    const [result] = await connection.execute(
      `UPDATE clients 
       SET name = ?, phone = ?, email = ?, company = ?, dob = ?, country = ?, address = ?, nie = ?, status = ?, note = ?
       WHERE client_id = ?`,
      [name, phone, email, company, dob, country, address, nie, status, note, id]
    );
    return result;
  } finally {
    connection.release();
  }
}

async function deleteClientById(clientId) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      'DELETE FROM clients WHERE client_id = ?',
      [clientId]
    );
    return result.affectedRows > 0;
  } finally {
    connection.release();
  }
}

export {createClient,getAllClient,getClientName,deleteClientById,updateClient,getClientById}

