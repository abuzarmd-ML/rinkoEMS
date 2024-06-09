import express from 'express'
import { createEmployeeController,getEmployeesController } from '../controllers/employeeController.js'
import { getEmployeeControllerById,updateEmployeeController,deleteEmployeeController } from '../controllers/employeeController.js';
import verifyTokenAndRole from '../auth/verifyTokenAndRole.js';

const router = express.Router()
router.post('/employees',verifyTokenAndRole, createEmployeeController);
router.get('/employees',verifyTokenAndRole, getEmployeesController);
router.get('/employeesById/:id',verifyTokenAndRole, getEmployeeControllerById);
router.put('/employeesById/:id',verifyTokenAndRole, updateEmployeeController);
router.delete('/employees/:employeeId',verifyTokenAndRole, deleteEmployeeController);


  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  export {router as EmployeeRouter}