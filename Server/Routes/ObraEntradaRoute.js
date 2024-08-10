// Server/Routes/ObraEntradaRoute.js

import express from 'express';
import { 
  createObraEntradaController, 
  updateObraEntradaController, 
  getObraEntradaControllerById ,
  getObraEntradaController,
  deleteObraEntradaController
} from '../controllers/obraEntradaController.js';

const router = express.Router();

router.post('/obraentradas', createObraEntradaController);
router.put('/obraentradasById/:id', updateObraEntradaController);
router.get('/obraentradasById/:id', getObraEntradaControllerById);
router.get('/obraentradas', getObraEntradaController);
router.delete('/obraentradas/:obraEntradaId', deleteObraEntradaController);

export {router as ObraEntradaRouter};
