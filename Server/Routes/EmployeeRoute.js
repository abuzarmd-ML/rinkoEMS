import express from 'express';
import { createEmployeeController, getEmployeesController, getEmployeeControllerById, updateEmployeeController, deleteEmployeeController } from '../controllers/employeeController.js';
import verifyTokenAndRole from '../auth/verifyTokenAndRole.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const uploadDir = 'D:/RinkoEMS/rinkoEMS/uploads';

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Define routes
router.post('/employees', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
  { name: 'nieDoc', maxCount: 1 },
  { name: 'license', maxCount: 1 },
  { name: 'contract', maxCount: 1 }
]), verifyTokenAndRole, createEmployeeController);


router.get('/employeesById/:id', verifyTokenAndRole, getEmployeeControllerById);
router.put('/employeesById/:id', verifyTokenAndRole, updateEmployeeController);
router.get('/employees', verifyTokenAndRole, getEmployeesController);
router.delete('/employees/:employeeId', verifyTokenAndRole, deleteEmployeeController);

export { router as EmployeeRouter };
