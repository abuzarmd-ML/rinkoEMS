import express from 'express'
import { createEmployeeOptionController,getEmployeeOptionController,updateEmployeeOptionController,deleteEmployeeOptionController } from '../controllers/dropDownOptionController.js';
import { createEmployeeTypeController,getEmployeeTypeController,updateEmployeeTypeController,deleteEmployeeTypeController } from '../controllers/dropDownOptionController.js';
import { createStatusOptionController,getStatusOptionController,updateStatusOptionController,deleteStatusOptionController } from '../controllers/dropDownOptionController.js';
import { createColorOptionController, getColorOptionController,updateColorOptionController, deleteColorOptionController } from '../controllers/dropDownOptionController.js';

import verifyTokenAndRole from '../auth/verifyTokenAndRole.js';

const router = express.Router();
router.post('/employee_status_options', verifyTokenAndRole, createEmployeeOptionController);
router.get('/employee_status_options', getEmployeeOptionController);
router.put('/employee_status_options/:id', updateEmployeeOptionController);
router.delete('/employee_status_options/:id', deleteEmployeeOptionController);

router.post('/employee_type_options', verifyTokenAndRole, createEmployeeTypeController);
router.get('/employee_type_options', getEmployeeTypeController);
router.put('/employee_type_options/:id', updateEmployeeTypeController);
router.delete('/employee_type_options/:id', deleteEmployeeTypeController);

router.post('/status_options', verifyTokenAndRole, createStatusOptionController);
router.get('/status_options', getStatusOptionController);
router.put('/status_options/:id', updateStatusOptionController);
router.delete('/status_options/:id', deleteStatusOptionController);

router.post('/company_colors_options', verifyTokenAndRole, createColorOptionController);
router.get('/company_colors_options', getColorOptionController);
router.put('/company_colors_options/:id', updateColorOptionController);
router.delete('/company_colors_options/:id', deleteColorOptionController);


export {router as DropDownOptionsRouter}