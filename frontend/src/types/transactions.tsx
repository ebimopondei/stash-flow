export interface TransactionsAttribute {
    id: string;
    userId: string;
    goalsId?: string;
    amount: string;
    type: string;
    from: string,
    to: string,
    description: string;

    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt: Date,
}