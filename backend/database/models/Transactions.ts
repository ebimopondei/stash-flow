'use strict';

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../setup";

interface TransactionsAttribute {
    id?: string;
    userId: string;
    goalsId: string;
    amount: string;
    type: string;
    description: string;

    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}

class Transactions extends Model<TransactionsAttribute> implements TransactionsAttribute{
    public id!: string;
    public userId!: string;
    public goalsId!: string;
    public amount!: string;
    public description!: string;
    public type!: string;

    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
}

Transactions.init({
  id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },

      goalsId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'SavingsGoals', // Name of the target table
          key: 'id',      // Column in Users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Users', // Name of the target table
          key: 'id',      // Column in Users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      type: {
        type: DataTypes.ENUM('deposit', 'deposit_goal', 'fund_goal', 'withdrawal', 'disbursement'),
        allowNull: false,
      },
      
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0

      },

      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
}, {
  sequelize,
  modelName: 'Transactions',
});


export default Transactions