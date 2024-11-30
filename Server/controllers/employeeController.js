// controllers/employeeController.js
import { createEmployee, getEmployees,updateEmployee,createEmployeeDocument } from "../models/employee.js";
import { getEmployeeById,deleteEmployeeById } from "../models/employee.js";

async function createEmployeeController(req, res) {
  try {
    // Log the incoming request data
    console.log("Received body data:", req.body);
    console.log("Received files:", req.files);

    // Assign company_id if company is present
    if (!req.body.company_id && req.body.company) {
      req.body.company_id = req.body.company;
      delete req.body.company;
    }

    // Destructure request body with fallback values to avoid undefined errors
    const {
      name = "", phone = "", country = "", dob = null, nie = "", caducidad = null,
      social_security = null, type = "", status = "", rate = 0, reference = "", remarks = "",
      bank_name = "", iban = "", company_id = null
    } = req.body;

    // Proceed to create the employee in the database
    const employeeId = await createEmployee(
      name, phone, country, dob, nie, caducidad, social_security, type, status,
      rate, reference, remarks, bank_name, iban, company_id
    );

    console.log("Generated Employee ID:", employeeId);

    // Handle file uploads if employee is successfully created
    if (req.files && employeeId) {
      const documentInsertPromises = Object.entries(req.files).map(([docType, files]) => {
        console.log("*********")
        if (files && files.length > 0) {
          const filePath = files[0].path;
          console.log(`Inserting document: type=${docType}, path=${filePath}`);
          return createEmployeeDocument(employeeId, docType, filePath);
        }
      });
      await Promise.all(documentInsertPromises);
    }

    res.status(201).json({ id: employeeId, message: 'Employee created successfully' });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Failed to create employee', error });
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

async function getEmployeeControllerById(req, res, next) {
  const employeeId = req.params.id;
  console.log("Fetching employee with ID:", employeeId)
  try {
    const employee = await getEmployeeById(employeeId);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Failed to fetch employee' });
  }
}

// async function updateEmployeeController(req, res, next) {
//   const employeeId = req.params.id;
//   const employeeData = req.body;

//   console.log("Received employee data:", employeeData)
//   try {
//     const result = await updateEmployee(employeeId, employeeData);
//     if (result.affectedRows === 0) {
//       res.status(404).json({ message: 'Employee not found' });
//     } else {
//       res.status(200).json({ message: 'Employee updated successfully' });
//     }
//   } catch (error) {
//     console.error('Error updating employee:', error);
//     res.status(500).json({ message: 'Failed to update employee' });
//   }
// }

async function updateEmployeeController(req, res, next) {
  const employeeId = req.params.id;
  const employeeData = req.body;

  console.log("Received employee data:", employeeData);

  if (!employeeData || Object.keys(employeeData).length === 0) {
    return res.status(400).json({ message: "No employee data provided for update." });
  }

  try {
    const result = await updateEmployee(employeeId, employeeData);
    
    if (!result) {
      throw new Error("Database query did not return a valid result.");
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(200).json({ message: "Employee updated successfully" });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Failed to update employee" });
  }
}


async function deleteEmployeeController(req, res) {
  const { employeeId } = req.params;
  try {
    const success = await deleteEmployeeById(employeeId);
    if (success) {
      res.status(200).json({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export { createEmployeeController, getEmployeesController, getEmployeeControllerById, updateEmployeeController,deleteEmployeeController};
