import { getFilterData, getAttendanceData, markAttendance } from '../models/attendanceModel.js';
import { checkAndInsertAttendance, CheckEmployeeProjectQuery, CreateOrUpdateAttandance } from '../models/checkAndInsertAttendance.js';

export const FilterDataController = async (req, res) => {
  try {
    const data = await getFilterData();

    console.log('Fetched Data:', data); // Check the structure of the data
    res.json(data);
  } catch (error) {
    console.error("Error fetching filter data:", error);
    res.status(500).json({ error: "Error fetching filter data" });
  }
};

export const AttendanceDataController = async (req, res) => {
  const filters = req.body;
  try {
    const data = await getAttendanceData(filters);
    res.json(data);
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res.status(500).json({ error: "Error fetching attendance data" });
  }
};

export const MarkAttendanceController = async (req, res) => {
  const attendanceData = req.body;

  try {
    const result = await markAttendance(attendanceData);
    res.status(201).json({ message: 'Attendance marked successfully', result });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ error: 'Error marking attendance' });
  }
};

export const UpdateAttandance = async (req, res) => {
  // const attandanceRecord = req.body.attandanceRecord;
  // Expecting an array of attendees in the request body
  const { employee_id, project_id, recorded_by, attandanceRecord } = req.body

  if (!attandanceRecord || attandanceRecord.length === 0) {
    res.status(400).json({ success: false, message: 'No attendees data provided' });
    return;
  }
  try {

    const { success, message } = await CheckEmployeeProjectQuery(employee_id, project_id)
    if (!success) {
      return res.status(404).json({ success, message });
    }

    await attandanceRecord.forEach((attendee) => {
      CreateOrUpdateAttandance(attendee, employee_id, project_id, recorded_by);
    });



    return res.status(202).json({ success: true, message: 'Valid employee and proejct' });

  } catch (e) {

    console.log('error', e)
    

  }

}
