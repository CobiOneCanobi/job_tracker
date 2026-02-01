import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const authRoutes = Router();

authRoutes.post('/sign-up', authController.signUp);
authRoutes.post('/login', authController.login);
authRoutes.post('/logout', ensureAuthenticated, authController.logout);

export default authRoutes;
