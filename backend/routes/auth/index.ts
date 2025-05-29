import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/login', (req: Request, res:Response) =>{
    res.status(200).json( { message: `server stared now!`});
});

router.post('/signup', (req: Request, res:Response) =>{
    res.status(200).json( { message: `server stared now!`});
})