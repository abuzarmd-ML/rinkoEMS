// routes/companyRoute.js
import express from 'express';
// import { getCompanies } from '../controllers/companyController.js';
import {createObraController,getObraController,getAllObraController,getObraControllerById,updateObraController,deleteObraController} from '../controllers/obraController.js'

const router = express.Router();

router.post('/obras', createObraController);
router.get('/obras', getObraController);
router.get('/all_obra', getAllObraController);
router.get('/obrasById/:id', getObraControllerById);
router.put('/obrasById/:id', updateObraController);
router.delete('/obras/:obraId', deleteObraController);















// export default router;
export { router as ObraRoute }; 
