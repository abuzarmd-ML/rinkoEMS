import express from 'express'
import { createEmployeeController } from '../controllers/employeeController.js'


const router = express.Router()


router.post('/employees', createEmployeeController);
//   router.get('/detail/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM employee where id = ?"
//     con.query(sql, [id], (err, result) => {
//         if(err) return res.json({Status: false});
//         return res.json(result)
//     })
//   })

  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  export {router as EmployeeRouter}