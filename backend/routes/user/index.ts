import express, { Request, Response } from 'express';
import {User as controller} from '../../controller/index';


const router = express.Router();

router.post('/goals', controller.createGoalsController );

router.get('/goals', controller.getGoalsController);

router.get('/goals/active', controller.getActiveGoalsController);

router.get('/dashboard', controller.getDashboardStats);

export const user = router;