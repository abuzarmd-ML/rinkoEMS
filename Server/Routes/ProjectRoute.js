// routes/companyRoute.js
import express from 'express';
// import { getCompanies } from '../controllers/companyController.js';
import {createProjectController,getProjectController,getProjectControllerById,getAllProjectController,updateProjectController,deleteProjectController} from '../controllers/ProjectController.js'

const router = express.Router();

router.post('/projects', createProjectController);
router.get('/projects', getProjectController);
router.get('/all_projects', getAllProjectController);
router.get('/projectsById/:id', getProjectControllerById);
router.put('/projectsById/:id', updateProjectController);
router.delete('/projects/:projectId', deleteProjectController);





// export default router;
export { router as ProjectRoute }; 