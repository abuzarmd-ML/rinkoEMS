// src/models/User.js

import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);

// Define the createUser function
async function createEmployee(name,phone,country,dob,nie,caducidad,social_security,company_id,type,status,rate,reference,remarks,bank_name,iban) {
  const connection = await pool.getConnection();
  try {
 
    const [result] = await connection.execute(
      'INSERT INTO employee (name, phone,country,dob,nie,caducidad,social_security,type,status, rate,reference,remarks,bank_name,iban,company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, phone,country,dob,nie,caducidad,social_security,type,status, rate,reference,remarks,bank_name,iban,company_id]
    );
    return result.insertId;
  } 
  catch (e){
    console.log("errorrrrrrr:",e)
  }
  finally {
    connection.release();
  }
}


async function getEmployees() {
  const connection = await pool.getConnection();
  try {
      const [rows] = await connection.execute(`
          SELECT * FROM employee
      `);
      return rows;
  } finally {
      connection.release();
  }
}

async function getEmployeeById(employeeId) {

  console.log("Executing query to fetch employee with ID:", employeeId);
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM employee WHERE employee_id = ?',
      [employeeId]
    );
    console.log(employeeId,rows)
    return rows[0];
  } finally {
    connection.release();
  }
}

async function updateEmployee(id, employeeData) {
  const connection = await pool.getConnection();
  try {
    const { name, phone, country, dob, nie, caducidad, social_security, company, type, status, rate, reference, remarks, bank_name, iban } = employeeData;
    const [result] = await connection.execute(
      `UPDATE employee 
       SET name = ?, phone = ?, country = ?, dob = ?, nie = ?, caducidad = ?, social_security = ?, company_id = ?, type = ?, status = ?, rate = ?, reference = ?, remarks = ?, bank_name = ?, iban = ?
       WHERE employee_id = ?`,
      [name, phone, country, dob, nie, caducidad, social_security, company, type, status, rate, reference, remarks, bank_name, iban, id]
    );
    return result;
  } finally {
    connection.release();
  }
}

async function deleteEmployeeById(employeeId) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      'DELETE FROM employee WHERE employee_id = ?',
      [employeeId]
    );
    return result.affectedRows > 0;
  } finally {
    connection.release();
  }
}

export { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployeeById};
