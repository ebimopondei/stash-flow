import express, { Request, Response } from 'express';
import { auth } from './auth';


const router = express.Router();

router.get('/', (req: Request, res:Response) =>{
    res.status(200).json( { message: `server stared now!`});
})

router.use('/auth', auth)

router.use('/public', (req: Request, res: Response)=> {
    res.status(200).json( { message: `This is the public route!`});
    
})

router.use('/user', (req: Request, res: Response)=> {
    res.status(200).json( { message: `This is the user route!`});
    
})


export const APPROUTER = router