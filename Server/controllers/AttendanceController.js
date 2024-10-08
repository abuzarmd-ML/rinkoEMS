import { getFilterData, getAttendanceData, markAttendance } from '../models/attendanceModel.js';

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
