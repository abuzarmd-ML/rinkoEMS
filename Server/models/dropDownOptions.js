import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);

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

export {getAllEmployeeOptions,createEmployeeOption,updateEmployeeOption,deleteEmployeeOption};
