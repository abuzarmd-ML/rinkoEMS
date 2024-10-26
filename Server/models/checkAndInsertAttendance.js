
import mysql from 'mysql2/promise';
import config from '../config/database.js';
import moment from 'moment'
const connection = mysql.createPool(config);
// Function to verify employee and project, check for duplicates, and insert new data if valid

export const CheckEmployeeProjectQuery = async(employee_id,project_id)=>{
    const checkEmployeeQuery = `SELECT COUNT(*) as count FROM employee WHERE employee_id = ?`;
    try{
        const [employeeResults] =  await connection.query(checkEmployeeQuery, [employee_id])
        const employeeExists = employeeResults[0].count > 0;

        if (!employeeExists) {
        
            return  ({ success: false, message: `Employee with employee_id: ${employee_id} does not exist` })
        }

        const checkProjectQuery = `SELECT COUNT(*) as count FROM projects WHERE project_id = ?`;
        const [projectResults] = await  connection.query(checkProjectQuery, [project_id])

        const projectExists = projectResults[0].count > 0;

        if (!projectExists) {

            return ({ success: false, message: `Project with project_id: ${project_id} does not exist` });
        }
        
        return ({success:true,})


    }catch(e){
        console.log('error',e)
    }

}

export const CreateOrUpdateAttandance = async(record,employee_id,project_id,recorded_by)=>{


    let date_time = new Date();
    const  recorded_date = moment().format('yyyy-MM-DD');
    const recorded_time = moment().format('hh:mm:ss')
    const inserRecord  = [employee_id,project_id,record.att_date,record.working_hours,recorded_by,recorded_date,recorded_time]
   console.log('recorded_date',recorded_date)
    const insertQuery = `
    INSERT INTO attandance  (employee_id, project_id, att_date, working_hours, recorded_by, recorded_date)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    working_hours = VALUES(working_hours),
    project_id = VALUES(project_id),
    recorded_by = VALUES(recorded_by),
    recorded_date = VALUES(recorded_date)
`;
try{
   const results = await  connection.query(insertQuery, inserRecord)
   console.log('results',results)
   return results
    // , (error, results) 
    
    // => {
    //     if (error) {
    //         res.status(500).json({ success: false, message: 'Error inserting attendance record', error });
    //         return console.error('Error inserting data:', error);
    //     }
    //     res.status(201).json({ success: true, message: 'Attendance record inserted successfully', data: attendee });
    // });

}catch(e){
 console.log('failed',e)
}


}

export const checkAndInsertAttendance = async(attendee, res) => {
    const {record_id, employee_id, project_id, att_date, working_hours, recorded_by, recorded_date, recorded_time} = attendee;

    // Step 1: Verify employee exists
    const checkEmployeeQuery = `SELECT COUNT(*) as count FROM employee WHERE employee_id = ?`;
    try{
        const employeeResults =  await connection.query(checkEmployeeQuery, [employee_id])
        
        const employeeExists = employeeResults[0].count > 0;

        if (!employeeExists) {
            res.status(404).json({ success: false, message: `Employee with employee_id: ${employee_id} does not exist` });
            return;
        }

        const checkProjectQuery = `SELECT COUNT(*) as count FROM projects WHERE project_id = ?`;
       const projectResults = await  connection.query(checkProjectQuery, [project_id])

        const projectExists = projectResults[0].count > 0;

        if (!projectExists) {
            res.status(404).json({ success: false, message: `Project with project_id: ${project_id} does not exist` });
            return;
        }



    }catch(e){
        console.log('error',e)
    }

    connection.query(checkEmployeeQuery, [employee_id], (error, employeeResults) => {
        console.log('employee does not exist')

        if (error) {
            res.status(500).json({ success: false, message: 'Error checking employee', error });
            return console.error('Error checking employee:', error);
        }

        const employeeExists = employeeResults[0].count > 0;


        if (!employeeExists) {
            res.status(404).json({ success: false, message: `Employee with employee_id: ${employee_id} does not exist` });
            return;
        }

        // Step 2: Verify project exists
        const checkProjectQuery = `SELECT COUNT(*) as count FROM projects WHERE project_id = ?`;
        connection.query(checkProjectQuery, [project_id], (error, projectResults) => {
            if (error) {
                res.status(500).json({ success: false, message: 'Error checking project', error });
                return console.error('Error checking project:', error);
            }

            const projectExists = projectResults[0].count > 0;

            if (!projectExists) {
                res.status(404).json({ success: false, message: `Project with project_id: ${project_id} does not exist` });
                return;
            }

            // Step 3: Check for duplicate attendance for the same date
            const checkDuplicateQuery = `SELECT COUNT(*) as count FROM attandance 
                                         WHERE employee_id = ? AND att_date = ?`;
            connection.query(checkDuplicateQuery, [employee_id, att_date], (error, duplicateResults) => {
                if (error) {
                    res.status(500).json({ success: false, message: 'Error checking for duplicate attendance', error });
                    return console.error('Error checking for duplicates:', error);
                }

                const duplicateCount = duplicateResults[0].count;

                if (duplicateCount > 0) {
                    res.status(409).json({ success: false, message: `Duplicate attendance found for employee_id: ${employee_id} on date: ${att_date}` });
                } else {
                    // Step 4: Insert the attendance record
                    const insertQuery = `INSERT INTO attandance 
                        (record_id, employee_id, project_id, att_date, working_hours, recorded_by, recorded_date, recorded_time) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

                    connection.query(insertQuery, attendee, (error, results) => {
                        if (error) {
                            res.status(500).json({ success: false, message: 'Error inserting attendance record', error });
                            return console.error('Error inserting data:', error);
                        }
                        res.status(201).json({ success: true, message: 'Attendance record inserted successfully', data: attendee });
                    });
                }
            });
        });
    });
};


