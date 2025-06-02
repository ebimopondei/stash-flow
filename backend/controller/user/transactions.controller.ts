import { Request, Response } from "express";
import Transactions from "../../database/models/Transactions";


const getTransactions = async ( req: Request, res: Response ) => {
    //@ts-expect-error
    const user = req.parsedToken
    const { page, limit } = req.query

    const transactionCount = await Transactions.count( { where: { userId: user.id } });
    const start = (Number(page) -1 ) * Number(limit);

    const transactions = await Transactions.findAll( { where: { userId: user.id }, order: [[ 'createdAt', 'DESC']], offset: Number(start), limit: Number(limit) })
    const totalPages = Math.ceil(transactionCount/Number(limit))

    res.json({success: true, data: { totalPages, transactionCount, transactions }, message: "User Created Successfully!"});
}


export { 
    getTransactions,
}