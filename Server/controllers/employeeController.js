// controllers/employeeController.js
import { createEmployee } from "../models/employee.js";

// Controller function to handle employee creation
async function createEmployeeController(req, res, next) {
    console.log("[Controller] : ", req.body)
  const {
    name,
    phone_number,
    dob,
    nie,
    caducidad,
    social_security,
    country,
    company_id,
    type,
    status,
    rate,
    reference,
    remarks,
    bank_name,
    iban
  } = req.body;
console.log("dataaa: ", {
    name,
    phone_number,
    dob,
    nie,
    caducidad,
    social_security,
    country,
    company_id,
    type,
    status,
    rate,
    reference,
    remarks,
    bank_name,
    iban
  })
  try {
    const employeeId = await createEmployee(
      name,
      phone_number,
      country,
      dob,
      nie,
      caducidad,
      social_security,
      company_id,
      type,
      status,
      rate,
      reference,
      remarks,
      bank_name,
      iban
    );

    res.status(201).json({ id: employeeId, message: 'Employee created successfully' });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Failed to create employee' });
  }
}

export { createEmployeeController };
