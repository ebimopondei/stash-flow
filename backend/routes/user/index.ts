import express, { Request, Response } from 'express';
import * as controller from '../../controller/index';


const router = express.Router();

router.post('/goals', controller.createGoalsController );

router.get('/goals', controller.getGoalsController);

router.get('/goals/active', controller.getActiveGoalsController);

export const user = router;