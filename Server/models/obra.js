// models/company.js
import mysql from 'mysql2/promise';
import config from '../config/database.js';


const pool = mysql.createPool(config);

async function createObra(obra_name, phone, email, company,address, nie, status,obra_website,F_Date) {
  const connection = await pool.getConnection();
  try {

    console.log("[MODEL]:", obra_name, address, status);
    // Ensure all fields are properly formatted
    const fields = [
      obra_name || null,
      phone || null,
      email || null,
      company,
      address || null,
      nie || null,
      status || null,
      obra_website || null,
      F_Date || null
    ];

    // Log the fields array to debug
    console.log("Fields array:", fields);

    const [result] = await connection.execute(
      'INSERT INTO obras (obra_name, phone, email, company,address, nie, status,obra_website,F_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      fields
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}


async function getObraName() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM obras');
    return rows;
  } finally {
    connection.release();
  }
}

async function getAllObra() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM obras');
    return rows; // Return the first (and presumably only) row
  } finally {
    connection.release();
  }
}

async function getObraById(obraId) {

  console.log("Executing query to fetch obra with ID:", obraId);
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM obras WHERE obra_id = ?',
      [obraId]
    );
    console.log(obraId,rows)
    return rows[0];
  } finally {
    connection.release();
  }
}

async function updateObra(id, ObraData) {
  const connection = await pool.getConnection();
  try {
      const { obra_name, phone, email, company,address, nie, status,obra_website,F_Date } = ObraData;
      
      // Check if all fields are present
      if ([obra_name, phone, email, company,address, nie, status,obra_website,F_Date].includes(undefined)) {
          throw new Error("Missing required fields in ObraData");
      }

      const [result] = await connection.execute(
          `UPDATE obras 
           SET obra_name = ?, phone = ?, email = ?, company = ?, address = ?, nie = ?, status = ?, obra_website = ?, F_Date=? WHERE obra_id = ?`,
          [obra_name, phone, email, company,address, nie, status,obra_website,F_Date,id]
      );
      return result;
  } finally {
      connection.release();
  }
}

async function deleteObraById(obraId) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      'DELETE FROM obras WHERE obra_id = ?',
      [obraId]
    );
    return result.affectedRows > 0;
  } finally {
    connection.release();
  }
}

export {createObra,getAllObra,getObraById,deleteObraById,updateObra,getObraName}

