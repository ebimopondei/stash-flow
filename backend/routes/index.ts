import express, { Request, Response } from 'express';
import { auth } from './auth';
import { verifyJwt } from '../middleware';
import { user } from './user';


const router = express.Router();

router.get('/', (req: Request, res:Response) =>{
    res.status(200).json( { message: `server stared now!`});
})

router.use('/auth', auth)

router.use('/user', verifyJwt, user)

router.use('/public', (req: Request, res: Response)=> {
    res.status(200).json( { message: `This is the public route!`});
    
})



export const APPROUTER = router