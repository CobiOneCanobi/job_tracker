import { Router } from 'express';
import * as authController from '../controllers/authController.js';

const authRoutes = Router();

authRoutes.post('/sign-up', authController.signUp);
authRoutes.post('/login', authController.login);

export default authRoutes;
