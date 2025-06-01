import { Request, Response } from "express";
import SavingsGoal from "../../database/models/Savingsgoal";
import Wallets from "../../database/models/Wallets";


const getDashboardStats = async ( req: Request, res: Response ) => {
    // @ts-expect-error
    const user = req.parsedToken;

    const wallets = await Wallets.findOne({ where: { userId: user.id}})

    const userActiveGoals = await SavingsGoal.findAll( { where: { userId: user.id, status: 'active' }})

    const totalSaved = await SavingsGoal.sum( 'savedAmount', {
        where: {
            status: 'active'
        }
    })

    const stats = {
        goals: userActiveGoals,
        wallets,
        activeGoals: userActiveGoals.length,
        totalSaved
    }
    res.json({success: true, data: stats, message: "User Created Successfully!"});
    
}


export { 
    getDashboardStats,
}