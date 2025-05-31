import { Request, Response } from "express";

import SavingsGoal from "../../database/models/Savingsgoal";

const getDashboardStats = async ( req: Request, res: Response ) => {
    // @ts-expect-error
    const user = req.parsedToken
    
    const userGoals = await SavingsGoal.findAll( { where: { userId: user.id }})

    res.json({success: true, data: userGoals, message: "User Created Successfully!"});
    
}

export { 
    getDashboardStats,
}