import { Request, Response } from "express";
import Wallets from "../../database/models/Wallets";
import { DepositSchema } from "@shared/validation/deposit-schema";
import type { payStackSuccessResponse } from "../../types/misc";
import Transactions from "../../database/models/Transactions";

const verifyPaystackDeposit = async ( req: Request, res: Response ) => {
    // @ts-expect-error
    const user = req.parsedToken;
    const { amount, reference, userId } : DepositSchema & payStackSuccessResponse = req.body  

    await Transactions.create( 
        { 
            amount, 
            userId: String(userId), 
            description: reference, 
            from: 'external', 
            to: 'main', 
            type: 'deposit'
        }
    )

    await Wallets.increment( 
        {
            main: Number(amount),
        },
        {
            where: {
                userId
            }
        }
    )

    res.json({success: true, data: [], message: "User Created Successfully!"});
    
}


export { 
    verifyPaystackDeposit,
}