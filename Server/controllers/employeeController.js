// controllers/employeeController.js
import { createEmployee, getEmployees } from "../models/employee.js";

// Controller function to handle employee creation
async function createEmployeeController(req, res, next) {
    console.log("[Controller] : ", req.body)
  const {
    name,
    phone,
    dob,
    nie,
    caducidad,
    social,
    country,
    company_id = '1',
    type = 'Full Time',
    status = 'Alta',
    rate,
    reference,
    remarks,
    bankName,
    iban
  } = req.body;
console.log("dataaa: ", {
    name,
    phone,
    dob,
    nie,
    caducidad,
    social,
    country,
    company_id,
    type,
    status,
    rate,
    reference,
    remarks,
    bankName,
    iban
  })
  try {
    const employeeId = await createEmployee(
      name,
      phone,
      country,
      dob,
      nie,
      caducidad,
      social,
      company_id,
      type,
      status,
      rate,
      reference,
      remarks,
      bankName,
      iban
    );

    res.status(201).json({ id: employeeId, message: 'Employee created successfully' });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Failed to create employee' });
  }
}


async function getEmployeesController(req, res, next) {
  try {
      const employees = await getEmployees();
      res.status(200).json(employees);
  } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ message: 'Failed to fetch employees' });
  }
}


export { createEmployeeController, getEmployeesController};
