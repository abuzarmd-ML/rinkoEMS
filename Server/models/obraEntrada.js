import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);

async function createObraEntrada(data) {
  const connection = await pool.getConnection();
  try {
    const {
      emp_id,
      company_id,
      project_id,
      obra_id,
      work_date
    } = data;

    console.log("Fields array:", data);
    const [result] = await connection.execute(
      `INSERT INTO obraentradas (
        emp_id, company_id, obra_id, project_id, work_date
      ) VALUES (?, ?, ?, ?, ?)`,
      [
        emp_id,company_id, obra_id, project_id, work_date
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
        SELECT 
        oe.*,
        e.name AS emp_name,
        e.social_security AS emp_social_security,
        e.type AS emp_type,
        c.name AS company_name,
        c.status AS company_status,
        o.obra_name,
        o.address AS obra_address,
        p.comunidad_name AS project_name  -- No trailing comma here
      FROM 
        obraentradas oe
      LEFT JOIN  
        employee e ON oe.emp_id = e.employee_id
      LEFT JOIN  
        companies c ON oe.company_id = c.company_id
      LEFT JOIN  
        obras o ON oe.obra_id = o.obra_id
      LEFT JOIN  
        projects p ON oe.project_id = p.project_id;
    `);
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
    const [rows] = await connection.execute(`
      SELECT 
        oe.*,
        e.name AS emp_name,
        e.social_security AS emp_social_security,
        e.type AS emp_type,
        c.name AS company_name,
        c.status AS company_status,
        o.obra_name,
        o.address AS obra_address,
        p.comunidad_name AS project_name  -- Remove the trailing comma here
      FROM 
        obraentradas oe
      LEFT JOIN  
        employee e ON oe.emp_id = e.employee_id
      LEFT JOIN  
        companies c ON oe.company_id = c.company_id
      LEFT JOIN  
        obras o ON oe.obra_id = o.obra_id
      LEFT JOIN  
        projects p ON oe.project_id = p.project_id
      WHERE oe.obraentrada_id = ?
    `, [obraEntradaId]);
    
    
    console.log("All details for obraentrada_id:.....", obraEntradaId, rows);
    return rows[0];
  } finally {
    connection.release();
  }
}


async function updateObraEntrada(id, obraEntradaData) {
  const connection = await pool.getConnection();
  try {
    const {
      emp_id,  // Update only emp_id, not emp_name, as emp_name is in the employee table
      company_id,
      obra_id,  // Assuming obra_id is in the obraentradas table
      project_id,
      work_date
    } = obraEntradaData;

    const [result] = await connection.execute(
      'UPDATE obraentradas SET emp_id = ?, company_id = ?, obra_id = ?, project_id = ?, work_date = ? WHERE obraentrada_id = ?',
      [emp_id, company_id, obra_id, project_id, work_date, id]
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
