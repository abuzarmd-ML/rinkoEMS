// routes/companyRoute.js
import express from 'express';
// import { getCompanies } from '../controllers/companyController.js';
import {createCompanyController,getCompaniesController,getCompaniesControllerById,updateCompanyController,getAllCompanyController,deleteCompanyController} from '../controllers/companyController.js'
import {createCompanyController,getCompaniesController,getAllCompanyController} from '../controllers/companyController.js'
import verifyTokenAndRole from '../auth/verifyTokenAndRole.js';
const router = express.Router();

router.post('/companies',verifyTokenAndRole, createCompanyController)
router.get('/companies', getCompaniesController);
router.get('/all_company', getAllCompanyController);
router.get('/companiesById/:id', getCompaniesControllerById);
router.put('/companiesById/:id', updateCompanyController);
router.delete('/companies/:companyId', deleteCompanyController);
router.get('/all_company',verifyTokenAndRole, getAllCompanyController);
// export default router;
export { router as CompanyRoute }; 
