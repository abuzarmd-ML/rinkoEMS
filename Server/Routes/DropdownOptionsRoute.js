import express from 'express'
import { createEmployeeOptionController,getEmployeeOptionController,updateEmployeeOptionController,deleteEmployeeOptionController } from '../controllers/dropDownOptionController.js';
import verifyTokenAndRole from '../auth/verifyTokenAndRole.js';

const router = express.Router();
router.post('/employee_status_options', verifyTokenAndRole, createEmployeeOptionController);
router.get('/employee_status_options', getEmployeeOptionController);
router.put('/employee_status_options/:id', updateEmployeeOptionController);
router.delete('/employee_status_options/:id', deleteEmployeeOptionController);

export {router as DropDownOptionsRouter}