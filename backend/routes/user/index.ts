import express, { Request, Response } from 'express';
import {User as controller} from '../../controller/index';


const router = express.Router();

router.post('/goals', controller.createGoalsController );

router.get('/goals', controller.getGoalsController);

router.patch('/goals', controller.updateGoalsController);

router.get('/goals/active', controller.getActiveGoalsController);

router.get('/dashboard', controller.getDashboardStats);

router.post( '/deposit/verify', controller.verifyPaystackDeposit)

router.get('/transactions', controller.getTransactions)

export const user = router;