// controllers/companyController.js
import { getCompanyName,createCompany,getAllCompany } from '../models/company.js';
import { deleteCompanyById,updateCompany } from '../models/company.js';

async function createCompanyController(req, res, next) {
  console.log("[Controller]:", req.body);

  const {
    name,
    phone,
    country,
    nie,
    caducidad,
    company_id,
    city,
    email,
    system_date,
    address,
    status,
    pincode
  } = req.body;

  try {
    const companyId = await createCompany(
      name,
      phone,
      country,
      nie,
      caducidad,
      company_id,
      city,
      email,
      system_date,
      address,
      status,
      pincode
    );

    res.status(201).json({ message: 'Company created successfully', companyId });
  } catch (error) {
    console.error('Error creating company:', error);
    next(error); // Passes the error to the error-handling middleware
  }
};


async function getCompaniesController(req, res) {
  try {
    const companies = await getCompanyName();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server error' });
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

async function deleteCompanyController(req, res) {
  const { companyId} = req.params;
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


export {createCompanyController,getCompaniesController,getAllCompanyController,deleteCompanyController}