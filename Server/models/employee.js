// src/models/User.js

import mysql from 'mysql2/promise';
import config from '../config/database.js';

const pool = mysql.createPool(config);

async function createEmployee(name, phone,country,dob,nie,caducidad,social_security,type,status, rate,reference,remarks,bank_name,iban,company_id) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      `INSERT INTO employee 
       (name, phone,country,dob,nie,caducidad,social_security,type,status, rate,reference,remarks,bank_name,iban,company_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, phone,country,dob,nie,caducidad,social_security,type,status, rate,reference,remarks,bank_name,iban,company_id]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error in createEmployee:", error);
    throw error;
  } finally {
    connection.release();
  }
}

const allowedDocumentTypes = ['photo', 'resume', 'nieDoc', 'license', 'contract'];

export async function createEmployeeDocument(employeeId, documentType, filePath, document_Name) {

  console.log("........")

   // Extract filename from the file path (if needed)
   const documentName = filePath.split("\\").pop(); // Extract the file name from the path (assuming Windows paths)

    // Validate documentType before insertion
    if (!allowedDocumentTypes.includes(documentType)) {
        console.error(`Invalid document type: ${documentType}`);
        throw new Error(`Invalid document type: ${documentType}`);
    }
    const connection = await pool.getConnection();

    try {
      await connection.execute(
            'INSERT INTO employee_documents (employee_id, document_type, file_path, document_name) VALUES (?, ?, ?, ?)',
            [employeeId, documentType, filePath, documentName]
        );
        console.log('Document inserted successfully',employeeId, documentType, documentName);
    } catch (error) {
        console.error('Error inserting document:', error);
    }
}

async function getEmployees() {
  const connection = await pool.getConnection();
  try {
      // Retrieve employee information along with documents in a single query
      const [rows] = await connection.execute(`
        SELECT e.*, c.name as company_name, d.document_type, d.file_path,d.document_name
        FROM employee e
        LEFT JOIN companies c ON e.company_id = c.company_id
        LEFT JOIN employee_documents d ON e.employee_id = d.employee_id
      `);

      // Group documents under their respective employee
      const employees = rows.reduce((acc, row) => {
        // If this employee_id doesn't exist in acc, add it
        if (!acc[row.employee_id]) {
          acc[row.employee_id] = {
            ...row,
            documents: []
          };
        }

        // If the current row has document data, add it to documents array
        if (row.document_type && row.file_path) {
          acc[row.employee_id].documents.push({
            type: row.document_type,
            path: row.file_path,
            d_name: row.document_name || 'Unknown Document Name'
          });
        }
       
        return acc;
      }, {});

      // Convert the grouped employees back to an array
      return Object.values(employees);
  } finally {
      connection.release();
  }
}


async function getEmployeeById(employeeId) {
  const connection = await pool.getConnection();
  try {

    
  console.log("Executing query to fetch employee with ID:", employeeId);
    // Retrieve employee information along with documents
    const [rows] = await connection.execute(`
      SELECT e.*, c.name as company_name, d.document_type, d.file_path, d.document_name
      FROM employee e
      LEFT JOIN companies c ON e.company_id = c.company_id
      LEFT JOIN employee_documents d ON e.employee_id = d.employee_id
      WHERE e.employee_id = ?`, [employeeId]
    );

    // If no rows are found, return null
    if (rows.length === 0) {
      return null;
    }

    // Group documents under the employee
    const employee = {
      ...rows[0],
      documents: rows.map(row => ({
        type: row.document_type,
        path: row.file_path,
        d_name: row.document_name || 'Unknown Document Name'
      })).filter(doc => doc.type && doc.path && doc.d_name) // Only include valid documents
    };
    console.log(employeeId,rows)

    return employee;
  } catch (error) {
    console.error("Error in getEmployeeById:", error);
    throw error;
  } finally {
    connection.release();
  }
}


// async function getEmployeeById(employeeId) {

//   console.log("Executing query to fetch employee with ID:", employeeId);
//   const connection = await pool.getConnection();
//   try {
//     const [rows] = await connection.execute(
//       'SELECT * FROM employee WHERE employee_id = ?',
//       [employeeId]
//     );
//     console.log(employeeId,rows)
//     return rows[0];
//   } finally {
//     connection.release();
//   }
// }

const VALID_COLUMNS = [
  'name', 'phone', 'country', 'dob', 'nie', 'caducidad', 'social_security',
  'company_id', 'type', 'status', 'rate', 'reference', 'remarks',
  'bank_name', 'iban'
];

 async function updateEmployee(id, employeeData) {
    const connection = await pool.getConnection();
    // try {
    //   // Filter out keys that don't match the valid columns in the `employee` table
    //   const filteredData = Object.keys(employeeData)
    //     .filter(key => VALID_COLUMNS.includes(key))
    //     .reduce((obj, key) => {
    //       obj[key] = employeeData[key];
    //       return obj;
    //     }, {});
  
    //   // Generate dynamic fields and values
    //   const fields = Object.keys(filteredData);
    //   const values = Object.values(filteredData);
  
    //   // Ensure we have fields to update
    //   if (fields.length === 0) {
    //     throw new Error("No valid fields to update.");
    //   }
  
    //   // Create the SET clause
    //   const setClause = fields.map(field => `${field} = ?`).join(', ');
  
    //   // Execute the query
    //   const [result] = await connection.execute(
    //     `UPDATE employee SET ${setClause} WHERE employee_id = ?`,
    //     [...values, id]
    //   );
  
    //   return result; // Return result for further processing
    // } catch (error) {
    //   console.error("Error in updateEmployee:", error);
    //   throw error;
    // } finally {
    //   connection.release();
    // }
    const VALID_COLUMNS = [
      "name", "phone", "country", "dob", "nie", "caducidad",
      "social_security", "type", "status", "rate", "reference",
      "remarks", "bank_name", "iban", "company_id"
    ];
    
    async function updateEmployee(id, employeeData) {
      const connection = await pool.getConnection(); // Use pool connection
      try {
        // Filter out invalid or undefined fields
        const filteredData = Object.keys(employeeData)
          .filter(key => VALID_COLUMNS.includes(key) && employeeData[key] !== undefined)
          .reduce((obj, key) => {
            obj[key] = employeeData[key];
            return obj;
          }, {});
    
        console.log("Filtered data for update:", filteredData);
    
        // Validate filtered data
        const fields = Object.keys(filteredData);
        if (fields.length === 0) {
          throw new Error("No valid fields provided for update.");
        }
    
        const values = Object.values(filteredData);
        const query = `
          UPDATE employee
          SET ${fields.map(field => `${field} = ?`).join(', ')}
          WHERE employee_id = ?
        `;
    
        values.push(id); // Add employee ID for the WHERE clause
    
        console.log("Generated query:", query); // Debug query
        console.log("Query values:", values); // Debug values
    
        // Execute the query
        const [result] = await connection.execute(query, values);
        return result; // Return result for further processing
      } catch (error) {
        console.error("Error in updateEmployee:", error);
        throw error; // Rethrow the error to the calling function
      } finally {
        connection.release(); // Always release connection
      }
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
