'use strict';

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../setup";

type source = 'external' | 'wallet' | 'goal' | 'main' | 'sub'

interface TransactionsAttribute {
    id?: string;
    userId: string;
    goalsId?: string;
    amount: string;
    type: string;
    from: string,
    to: string,
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
    public from!: string;
    public to!: string;
    public description!: string;
    public type!: string;

    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
}

Transactions.init({
  id: {
        type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
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

      from: {
        type: DataTypes.ENUM('goal', 'wallet', 'main', 'sub', 'external'),
        allowNull: false
      },

      to: {
        type: DataTypes.ENUM('goal', 'wallet', 'main', 'sub', 'external'),
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