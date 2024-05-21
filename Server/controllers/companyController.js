// controllers/companyController.js
import { getAllCompanies } from '../models/company.js';

export async function getCompanies(req, res) {
  try {
    const companies = await getAllCompanies();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
