import { createCompany, getCompanyName,getCompanyById, getAllCompany, deleteCompanyById, updateCompany } from '../models/company.js';

async function createCompanyController(req, res, next) {
  try {
    const {
      name,
      address,
      city,
      country,
      pincode,
      phone,
      email,
      nie,
      caducidad,
      status,      
      system_date,color
    } = req.body;

    console.log("Request body:", req.body); // Log the entire request body
    const companyId = await createCompany(
      name,
      address,
      city,
      country,
      pincode,
      phone,
      email,
      nie,
      caducidad,
      status,      
      system_date,color
    );

    res.status(201).json({ message: 'Company created successfully', companyId });
  } catch (error) {
    console.error('Error creating company:', error);
    next(error);
  }
}



async function getCompaniesController(req, res) {
  try {
    const companies = await getCompanyName();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getCompaniesControllerById(req, res, next) {
  const companyId = req.params.id;
  console.log("Fetching employee with ID:", companyId)
  try {
    const company = await getCompanyById(companyId);
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: 'company not found' });
    }
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ message: 'Failed to fetch company' });
  }
}


async function getAllCompanyController(req, res) {
  try {
    const companies = await getAllCompany();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
async function updateCompanyController(req, res, next) {
  const companyId = req.params.id;
  const companyData = req.body;
  try {
    const result = await updateCompany(companyId, companyData);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Company not found' });
    } else {
      res.status(200).json({ message: 'Company updated successfully' });
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Failed to update employee' });
  }
}


async function deleteCompanyController(req, res) {
  const { companyId } = req.params;
  try {
    const success = await deleteCompanyById(companyId);
    if (success) {
      res.status(200).json({ message: 'Company deleted successfully' });
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    console.error('Error deleting Company:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


export {createCompanyController,getCompaniesController,updateCompanyController,getAllCompanyController,deleteCompanyController,getCompaniesControllerById}