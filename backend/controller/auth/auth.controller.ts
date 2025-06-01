import { Request, Response } from "express";

import { signupSchema, loginSchema } from '../../../shared/validation/signup-schema'

import User from "../../database/models/User";

import { SECRET as secret, REFRESHSECRET as refreshSecret } from '../../config/secret'


import bcrypt from 'bcryptjs'
import { Op } from "sequelize";
import Wallets from "../../database/models/Wallets";

const jwt = require('jsonwebtoken')

const signupController = async ( req: Request, res: Response ) => {

    const validated = signupSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(validated.password, 10);

     const newUser = await User.create({
      firstname: validated.firstname,
      lastname: validated.lastname,
      email: validated.email,
      password: hashedPassword,
    });

    res.json({success: true, data: newUser, message: "User Created Successfully!"});
    
}

const loginController = async ( req: Request, res: Response ) => {

    const validated = loginSchema.parse(req.body);

    const user = await User.findOne( { 
        where: { 
            [Op.or]: [
                {  
                    email: validated.email 
                }, 
                { 
                    username: validated.email 
                }
            ]},
        attributes:  ['id', 'username', 'email', 'password']
        
    });

    if (!user) {
        res.status(400).json({ success: false, message: 'Invalid Credentials' });
        return 
    }

    //to be removed later
    await Wallets.findOrCreate( { where: { userId: user.id }} )

    const isMatch = await bcrypt.compare(validated.password, user.password);

    if (!isMatch) {
        res.status(400).json({ success: false, message: 'Invalid Credentials' });
        return 
    }
            
    const token = jwt.sign(user?.toJSON(), secret, {expiresIn: "1h" });
    const refreshToken = jwt.sign(user?.toJSON(), refreshSecret, { expiresIn: "1d"});
    
    res.json({success: true, data: { token, refreshToken, user }, message: "Login Successfully!"});

}

const refreshTokenController = async (req:Request, res:Response) =>{
    const refreshToken = req.body.refreshToken;
    if(!refreshToken){
        res.status(401).json({ message: 'unathorized access'})
        return;
    }

    jwt.verify( refreshToken, refreshSecret, ( err:Error, data:any ) => {
        
            if( err ) return res.status( 401 ).json( { success: true, message: err.message, data: [] });

            delete data.iat
            delete data.exp

            const token = jwt.sign(data, secret, {expiresIn: "1h" });
            const refreshToken = jwt.sign(data, refreshSecret, {expiresIn: "1d" });
            
            res.json({ token, refreshToken })
        })


}

const authCheck = async (req: Request, res: Response) => {
    const token = req.body.token;

    if(token){
        res.status(201).json({ isAuthenticated: true })
    }else {
        res.status(401).json( { isAuthenticated: false } )
    }

}

export { 
    signupController,
    loginController,
    refreshTokenController,
    authCheck
}