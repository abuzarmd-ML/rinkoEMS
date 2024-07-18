import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);

async function createCompany(name,address,city,country,pincode,phone,email,nie,caducidad,status,system_date,color) {
  const connection = await pool.getConnection();
  try {
    console.log("[MODEL]:", name,address,city,country,pincode,phone,email,nie,caducidad,status,system_date,color);

    const fields = [name,address,city,country,pincode,phone,email,nie,caducidad,status,system_date,color].map(field => field === undefined ? null : field);

    const [result] = await connection.execute(
      'INSERT INTO companies (name,address,city,country,pincode,phone,email,nie,caducidad,status,system_date,color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      fields
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}



async function getCompanyName() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM companies');
    return rows;
  } finally {
    connection.release();
  }
}

async function getCompanyById(companyId) {

  console.log("Executing query to fetch employee with ID:", companyId);
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM companies WHERE company_id = ?',
      [companyId]
    );
    console.log(companyId,rows)
    return rows[0];
  } finally {
    connection.release();
  }
}

async function getAllCompany() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM companies');
    return rows; // Return the first (and presumably only) row
  } finally {
    connection.release();
  }
}

async function updateCompany(id, companyData) {
  const connection = await pool.getConnection();
  try {
    const {name, address, status, phone, country, nie, caducidad, company_id, city, email, system_date, pincode,color} = companyData;
     const [result] = await connection.execute(
      `UPDATE companies 
       SET name = ?, address = ?, status = ?, phone = ?, country = ?, nie = ?, caducidad = ?, company_id = ?, city = ?, email = ?, system_date = ?, pincode = ?,color= ?
       WHERE company_id = ?`,
       [name, address, status, phone, country, nie, caducidad, company_id, city, email, system_date, pincode,color, id]
    );
    console.log("[MOdel UPdate]:", name, address, status, phone, country, nie, caducidad, company_id, city, email, system_date, pincode,color); 
   
    return result;
   
  } finally {
    connection.release();
  }
}
async function deleteCompanyById(companyId) {
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


export {createCompany,getCompanyName,getCompanyById,getAllCompany,deleteCompanyById,updateCompany}

