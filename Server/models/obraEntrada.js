import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);

async function createObraEntrada(data) {
  const connection = await pool.getConnection();
  try {
    const {
      emp_id,
      emp_name,
      emp_social_security,
      emp_type,
      company_id,
      company_name,
      company_status,
      obra_name,
      obra_address,
      project_id,
      project_name,
      work_date
    } = data;

    console.log("Fields array:", data);
    const [result] = await connection.execute(
      `INSERT INTO obraentradas (
        emp_id, emp_name, emp_social_security, emp_type, company_id, company_name, company_status, obra_name, obra_address, project_id, project_name, work_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        emp_id, emp_name, emp_social_security, emp_type, company_id, company_name, company_status, obra_name, obra_address, project_id, project_name, work_date
      ]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}


async function getAllObraEntradas() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(`
      select * from obraentradas`);
    return rows;
  } finally {
    connection.release();
  }
}
async function getObraEntradaName() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM obraentradas');
    return rows;
  } finally {
    connection.release();
  }
}

async function getObraEntradaById(obraEntradaId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM obraentradas WHERE obraentrada_id = ?',
      [obraEntradaId]
    );
    console.log("All details: ",obraEntradaId,rows)
    return rows[0];
  } finally {
    connection.release();
  }
}

async function updateObraEntrada(id, obraEntradaData) {
  const connection = await pool.getConnection();
  try {
    const {
      emp_id,
      emp_name,
      emp_social_security,
      emp_type,
      company_id,
      company_name,
      company_status,
      obra_name,
      obra_address,
      project_id,
      project_name,
      work_date
    } = obraEntradaData;

    const [result] = await connection.execute(
      'UPDATE obraentradas SET emp_id = ?, emp_name = ?, emp_social_security = ?, emp_type = ?, company_id = ?, company_name = ?, company_status = ?, obra_name = ?, obra_address = ?, project_id = ?, project_name = ?, work_date = ? WHERE obraentrada_id = ?',
      [emp_id, emp_name, emp_social_security, emp_type, company_id, company_name, company_status, obra_name, obra_address, project_id, project_name, work_date, id]
    );
    return result;
  } finally {
    connection.release();
  }
}


async function deleteObraEntradaById(obraEntradaId) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute('DELETE FROM obraentradas WHERE obraentrada_id = ?', [obraEntradaId]);
    return result.affectedRows > 0;
  } finally {
    connection.release();
  }
}

export {
  createObraEntrada,
  getAllObraEntradas,
  getObraEntradaById,
  updateObraEntrada,
  deleteObraEntradaById,
  getObraEntradaName
};
