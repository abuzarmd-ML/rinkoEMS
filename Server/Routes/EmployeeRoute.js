import express from 'express'
import { createEmployeeController,getEmployeesController } from '../controllers/employeeController.js'
import { getEmployeeControllerById,updateEmployeeController,deleteEmployeeController } from '../controllers/employeeController.js';


const router = express.Router()
router.post('/employees', createEmployeeController);
router.get('/employees', getEmployeesController);
router.get('/employeesById/:id', getEmployeeControllerById);
router.put('/employeesById/:id', updateEmployeeController);
router.delete('/employees/:employeeId', deleteEmployeeController);


  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  export {router as EmployeeRouter}