  import mysql from 'mysql2/promise';
  import config from '../config/database.js';

  const pool = mysql.createPool(config);

  
  export const getFilterData = async () => {
    try {
      const [obraEntradas] = await pool.query(`
        SELECT 
          oe.obraentrada_id,
          oe.emp_id,
          oe.company_id,
          oe.project_id,
          oe.obra_id,
          oe.work_date,
          c.name AS company_name,
          c.status AS company_status,
          e.name AS emp_name,
          o.obra_name,
          p.comunidad_name AS project_name
        FROM obraentradas oe
        LEFT JOIN companies c ON oe.company_id = c.company_id
        LEFT JOIN employee e ON oe.emp_id = e.employee_id
        LEFT JOIN obras o ON oe.obra_id = o.obra_id
        LEFT JOIN projects p ON oe.project_id = p.project_id
      `);
      
      // Return everything fetched in one response object
      return { obraEntradas };
  
    } catch (error) {
      console.error('Error fetching filter data:', error);
      throw error;
    }
  };
  

  export const getAttendanceData = async (filters) => {
    const { company, project, obra, employee } = filters;
  
    try {
      let query = `
        SELECT 
          oe.*,
          e.name AS emp_name,
          e.social_security AS emp_social_security,
          e.type AS emp_type,
          c.name AS company_name,
          c.status AS company_status,
          o.obra_name AS obra_name,
          o.address AS obra_address,
          p.comunidad_name AS project_name,
          oe.work_date AS work_date
        FROM obraentradas oe
        LEFT JOIN employee e ON oe.emp_id = e.employee_id
        LEFT JOIN companies c ON oe.company_id = c.company_id
        LEFT JOIN obras o ON oe.obra_id = o.obra_id
        LEFT JOIN projects p ON oe.project_id = p.project_id
        WHERE 1=1
      `;
  
      const params = [];
      if (company) {
        query += ' AND oe.company_id = ?';
        params.push(company);
      }
      if (project) {
        query += ' AND oe.project_id = ?';
        params.push(project);
      }
      if (obra) {
        query += ' AND oe.obra_id = ?';
        params.push(obra);
      }
      if (employee) {
        query += ' AND oe.emp_id = ?';
        params.push(employee);
      }
  
      const [results] = await pool.query(query, params);
      return results;
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      throw error;
    }
  };
  
  
export const markAttendance = async (attendanceData) => {
    const { emp_id, company_id, project_id, obra_id, work_date } = attendanceData;
  
    try {
      const query = `
        INSERT INTO obraentradas (emp_id, company_id, project_id, obra_id, work_date)
        VALUES (?, ?, ?, ?, ?)
      `;
  
      const [result] = await pool.execute(query, [emp_id, company_id, project_id, obra_id, work_date]);
      return result;
    } catch (error) {
      console.error('Error marking attendance:', error);
      throw error;
    }
  };

  
