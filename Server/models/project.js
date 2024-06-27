// models/company.js
import mysql from 'mysql2/promise';
import config from '../config/database.js';


const pool = mysql.createPool(config);

async function createProject(comunidad_name, fact_email, company, obra_id, nie, obra_website, cudad_id, venc_days) {
    const connection = await pool.getConnection();
    try {
      console.log("[MODEL]:", { comunidad_name, fact_email, company, obra_id, nie, obra_website, cudad_id, venc_days });
  
      
    // Extract the actual value from the company object
    // const companyLabel = company && company.label ? company.label : null;

      const fields = [
        comunidad_name || null,
        fact_email || null,
        company || null,
        obra_id || null,
        nie || null,
        obra_website || null,
        cudad_id || null,
        venc_days || null
      ];
  
      console.log("Fields array:", fields);
  
      const [result] = await connection.execute(
        'INSERT INTO projects (comunidad_name, fact_email, company, obra_id, nie, obra_website, cudad_id, venc_days) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
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
    const [rows] = await connection.execute('SELECT * FROM projects');
    return rows; // Return the first (and presumably only) row
  } finally {
    connection.release();
  }
}

async function getProjectById(projectId) {

  console.log("Executing query to fetch project with ID:", projectId);
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM projects WHERE project_id = ?',
      [projectId]
    );
    console.log(projectId,rows)
    return rows[0];
  } finally {
    connection.release();
  }
}

async function updateProject(id, projectData) {
  const connection = await pool.getConnection();
  try {
      const { comunidad_name, fact_email, company, obra_id, nie, obra_website, cudad_id, venc_days } = projectData;
      
      // Check if all fields are present
      if ([comunidad_name, fact_email, company, obra_id, nie, obra_website, cudad_id, venc_days].includes(undefined)) {
          throw new Error("Missing required fields in projectData");
      }

      const [result] = await connection.execute(
          `UPDATE projects 
           SET comunidad_name = ?, fact_email = ?, company = ?, obra_id = ?, nie = ?, obra_website = ?, cudad_id = ?, venc_days = ?
           WHERE project_id = ?`,
          [comunidad_name, fact_email, company, obra_id, nie, obra_website, cudad_id, venc_days, id]
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