import express from 'express';
import { FilterDataController, AttendanceDataController, MarkAttendanceController,UpdateAttandance } from '../controllers/AttendanceController.js'; 

const router = express.Router();

// Route to get filter data
router.get('/filteredData', FilterDataController);

// Route to get attendance data based on filters
router.get('/attendanceData', AttendanceDataController );

router.post('/markAttendance', MarkAttendanceController);
router.put('/updateAttandance',UpdateAttandance)

export { router as AttendanceRouter };
