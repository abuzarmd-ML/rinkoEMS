// models/company.js
import mysql from 'mysql2/promise';
import config from '../config/database.js';


const pool = mysql.createPool(config);

async function createProject(comunidad_name, fact_email, obra_id, nie, cudad_id, venc_days,company_id) {
    const connection = await pool.getConnection();
    try {
      console.log("[MODEL]:", { comunidad_name, fact_email, obra_id, nie, cudad_id, venc_days,company_id });
  
      
    // Extract the actual value from the company object
    // const companyLabel = company && company.label ? company.label : null;

      const fields = [
        comunidad_name || null,
        fact_email || null,
        obra_id || null,
        nie || null,
        cudad_id || null,
        venc_days || null,
        company_id
      ];
  
      console.log("Fields array:", fields);
  
      const [result] = await connection.execute(
        'INSERT INTO projects (comunidad_name, fact_email, obra_id, nie, cudad_id, venc_days,company_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        fields
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  }
  

async function getProjectName() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM projects');
    return rows;
  } finally {
    connection.release();
  }
}

async function getAllProject() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(`
      SELECT p.*,
             o.obra_name,
             o.address AS obra_address,
             o.obra_website AS obra_website,
             c.name AS company_name,
             c.address AS company_address
      FROM projects p
      LEFT JOIN obras o ON p.obra_id = o.obra_id
      LEFT JOIN companies c ON p.company_id = c.company_id;
    `);
    return rows;
  } finally {
    connection.release();
  }
}


async function getProjectById(projectId) {
  console.log("Executing query to fetch project with ID:", projectId);
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT p.*,
              o.obra_name,
              o.address AS obra_address,
              o.obra_website AS obra_website,
              c.name AS company_name,
              c.address AS company_address
       FROM 
              projects p
       LEFT JOIN 
              obras o ON p.obra_id = o.obra_id
       LEFT JOIN 
              companies c ON p.company_id = c.company_id
       WHERE project_id = ?`, 
      [projectId]
    );
    
    console.log("Fetched project details:", rows);

    if (rows.length > 0) {
      return rows[0]; // Return the first row
    } else {
      return null; // Return null if no rows found
    }
  } finally {
    connection.release();
  }
}


async function updateProject(id, projectData) {
  const connection = await pool.getConnection();
  try {
      const { comunidad_name, fact_email, obra_id, company_id, nie, cudad_id, venc_days } = projectData;
      
      // Check if all fields are present
      if ([comunidad_name, fact_email, obra_id, company_id, nie, cudad_id, venc_days].includes(undefined)) {
          throw new Error("Missing required fields in projectData");
      }

      const [result] = await connection.execute(
          `UPDATE projects 
           SET comunidad_name = ?, fact_email = ?, obra_id = ?, company_id =?, nie = ?, cudad_id = ?, venc_days = ?
           WHERE project_id = ?`,
          [comunidad_name, fact_email, obra_id, company_id, nie, cudad_id, venc_days, id]
      );
      return result;
  } finally {
      connection.release();
  }
}

async function deleteProjectById(projectId) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      'DELETE FROM projects WHERE project_id = ?',
      [projectId]
    );
    return result.affectedRows > 0;
  } finally {
    connection.release();
  }
}

export {createProject,getAllProject,getProjectName,deleteProjectById,updateProject,getProjectById}