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
    const userAgent = req.useragent;

    // Extract specific details from userAgent
    const deviceType = userAgent?.isMobile ? 'Mobile' : userAgent?.isTablet ? 'Tablet' : userAgent?.isDesktop ? 'Desktop' : 'Unknown';
    const os = userAgent?.os;
    const platform = userAgent?.platform;
    const browser = userAgent?.browser;
    const ip = req.connection.remoteAddress

    console.log('--- User Details ---');
    console.log(`IP Address: ${req.ip}`);
    console.log(`IP Address: ${req.connection.remoteAddress}`);
    console.log(`Device Type: ${deviceType}`);
    console.log(`Operating System: ${os}`);
    console.log(`Platform: ${platform}`);
    console.log(`Browser: ${browser}`);
    console.log('--------------------');
    console.log(req.useragent)
    console.log('--------------------');

    res.status(200).json( { ip, deviceType, os, platform, browser, message: `This is the public route!` });
})



export const APPROUTER = router