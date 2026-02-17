import { Router } from 'express';
import * as companyController from '../controllers/companyController.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const companyRoutes = Router();

companyRoutes.get('/', ensureAuthenticated, companyController.index);
companyRoutes.post('/', ensureAuthenticated, companyController.create);

export default companyRoutes;
