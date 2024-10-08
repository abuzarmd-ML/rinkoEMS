import express from 'express';
import { signup,userInfoAndRole } from '../controllers/userController.js'; 
import verifyTokenAndRole from '../auth/verifyTokenAndRole.js';

const router = express.Router();

router.post('/signup', signup); 
router.get('/getUserInfo',verifyTokenAndRole, userInfoAndRole); 

export { router as userRoute }; 


