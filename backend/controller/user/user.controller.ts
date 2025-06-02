import { Request, Response } from "express";

import { createGoalSchema } from '../../../shared/validation/goals-schema'

import SavingsGoal from "../../database/models/Savingsgoal";

const jwt = require('jsonwebtoken')

const getGoalsController = async ( req: Request, res: Response ) => {
    // @ts-expect-error
    const user = req.parsedToken
    
    const userGoals = await SavingsGoal.findAll( { where: { userId: user.id }})

    res.json({success: true, data: userGoals, message: "User Created Successfully!"});
    
}

const getDashboardStats = async ( req: Request, res: Response ) => {
    // @ts-expect-error
    const user = req.parsedToken
    
    const userGoals = await SavingsGoal.findAll( { where: { userId: user.id }})

    res.json({success: true, data: userGoals, message: "User Created Successfully!"});
    
}

const getActiveGoalsController = async ( req: Request, res: Response ) => {
    // @ts-expect-error
    const user = req.parsedToken
    
    const userGoals = await SavingsGoal.findAll( { where: { userId: user.id, status: 'active' }})

    res.json({success: true, data: userGoals, message: "User Created Successfully!"});
    
}

const createGoalsController = async ( req: Request, res: Response ) => {

    // @ts-expect-error
    const user = req.parsedToken

    const validated = createGoalSchema.parse(req.body);

    const goal = await SavingsGoal.create( {
        title: validated.title,
        description: validated.description,
        category: validated.category,
        deadline: new Date(validated.deadline),
        isLocked: false,
        savedAmount: '0',
        status: 'active',
        targetAmount: validated.targetAmount,
        userId: user.id
    })
    
    res.json({success: true, data: goal, message: "Saving Goal Created!"});

}

export { 
    getGoalsController,
    getActiveGoalsController,
    createGoalsController,
    getDashboardStats,
}