// routes/companyRoute.js
import express from 'express';
// import { getCompanies } from '../controllers/companyController.js';
import {createClientController,getClientController,getClientsControllerById,getAllClientController,updateClientController,deleteClientController} from '../controllers/clientController.js'

const router = express.Router();

router.post('/clients', createClientController);
router.get('/clients', getClientController);
router.get('/all_client', getAllClientController);
router.get('/clientsById/:id', getClientsControllerById);
router.put('/clientsById/:id', updateClientController);
router.delete('/clients/:clientId', deleteClientController);















// export default router;
export { router as ClientRoute }; 
