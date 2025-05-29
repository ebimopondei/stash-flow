import express, { Request, Response } from 'express';


const router = express.Router();

router.get('/', (req: Request, res:Response) =>{
    res.status(200).json( { message: `server stared now!`});
})

router.use('/auth', (req: Request, res: Response)=> {
    res.status(200).json( { message: `This is the auth route!`});
    
})

router.use('/public', (req: Request, res: Response)=> {
    res.status(200).json( { message: `This is the public route!`});
    
})

router.use('/user', (req: Request, res: Response)=> {
    res.status(200).json( { message: `This is the user route!`});
    
})


export const APPROUTER = router