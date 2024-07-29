import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);


// .................**Employee status..........*******

async function getAllEmployeeOptions() {
  const [rows] = await pool.query('SELECT * FROM employee_statuses');
  return rows;
}

async function createEmployeeOption(name) {
  const [result] = await pool.query('INSERT INTO employee_statuses (name) VALUES (?)', [name]);
  return { id: result.insertId, name };
}

async function updateEmployeeOption(id, name) {
  const [result] = await pool.query('UPDATE employee_statuses SET name = ? WHERE id = ?', [name, id]);
  return result.affectedRows;
}

async function deleteEmployeeOption(id) {
  const [result] = await pool.query('DELETE FROM employee_statuses WHERE id = ?', [id]);
  return result.affectedRows;
}



// ...................**************Employee type ***********...............

async function getAllEmployeeTypes() {
  const [rows] = await pool.query('SELECT * FROM employee_types');
  return rows;
}

async function createEmployeeTypes(name) {
  const [result] = await pool.query('INSERT INTO employee_types (name) VALUES (?)', [name]);
  return { id: result.insertId, name };
}

async function updateEmployeeTypes(id, name) {
  const [result] = await pool.query('UPDATE employee_types SET name = ? WHERE id = ?', [name, id]);
  return result.affectedRows;
}

async function deleteEmployeeTypes(id) {
  const [result] = await pool.query('DELETE FROM employee_types WHERE id = ?', [id]);
  return result.affectedRows;
}


// ..................**********Status..................********


async function getAllStatusOptions() {
  const [rows] = await pool.query('SELECT * FROM statuses');
  return rows;
}

async function createStatusOption(name) {
  const [result] = await pool.query('INSERT INTO statuses (name) VALUES (?)', [name]);
  return { id: result.insertId, name };
}

async function updateStatusOption(id, name) {
  const [result] = await pool.query('UPDATE statuses SET name = ? WHERE id = ?', [name, id]);
  return result.affectedRows;
}

async function deleteStatusOption(id) {
  const [result] = await pool.query('DELETE FROM statuses WHERE id = ?', [id]);
  return result.affectedRows;
}


// ............**************  color........****************


async function getAllColorOptions() {
  const [rows] = await pool.query('SELECT * FROM company_colors');
  return rows;
}

async function createColorOption(name) {
  const [result] = await pool.query('INSERT INTO company_colors (name) VALUES (?)', [name]);
  return { id: result.insertId, name };
}

async function updateColorOption(id, name) {
  const [result] = await pool.query('UPDATE company_colors SET name = ? WHERE id = ?', [name, id]);
  return result.affectedRows;
}

async function deleteColorOption(id) {
  const [result] = await pool.query('DELETE FROM company_colors WHERE id = ?', [id]);
  return result.affectedRows;
}



export {getAllEmployeeOptions,createEmployeeOption,updateEmployeeOption,deleteEmployeeOption};
export {getAllEmployeeTypes,createEmployeeTypes,updateEmployeeTypes,deleteEmployeeTypes};
export {getAllStatusOptions,createStatusOption,updateStatusOption,deleteStatusOption};
export {getAllColorOptions,createColorOption, updateColorOption, deleteColorOption};
