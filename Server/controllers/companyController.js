// controllers/companyController.js
import { getAllCompanies,createCompany } from '../models/company.js';

async function createCompanyController(req, res, next) {
  console.log("[Controller] : ", req.body)
  const {
    name,
    address,
    encargar,
    status = 'Other',
  } = req.body;
  try {
    const companyId = await createCompany(
    name,
    address,
    encargar,
    status
  );

  res.status(201).json({ id: companyId, message: 'Employee created successfully' });
} catch (error) {
  console.error('Error creating employee:', error);
  res.status(500).json({ message: 'Failed to create employee' });
}
}

async function getCompaniesController(req, res) {
  try {
    const companies = await getAllCompanies();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export {createCompanyController,getCompaniesController}