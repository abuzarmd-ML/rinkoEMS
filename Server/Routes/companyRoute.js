// routes/companyRoute.js
import express from 'express';
// import { getCompanies } from '../controllers/companyController.js';
import {createCompanyController,getCompaniesController,getAllCompanyController} from '../controllers/companyController.js'

const router = express.Router();

router.post('/companies', createCompanyController)
router.get('/companies', getCompaniesController);
router.get('/all_company', getAllCompanyController);

// export default router;
export { router as CompanyRoute }; 
