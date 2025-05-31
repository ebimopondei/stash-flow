'use strict';

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../setup";

  

  interface SavingsGoalAttributes {
      id?: number;
      userId: string;
      title: string;
      description: string;
      category: string;
      targetAmount: string;
      savedAmount: string;
      deadline: Date;
      isLocked: Boolean;
      status: String;
  
      updatedAt?: Date;
      deletedAt?: Date,
      createdAt?: Date,
  }
  
  
  class SavingsGoal extends Model<SavingsGoalAttributes> implements SavingsGoalAttributes{
      public id!: number;
      public userId!: string;
      public title!: string;
      public description!: string;
      public category!: string;
      public targetAmount!: string;
      public savedAmount!: string;
      public deadline!: Date;
      public isLocked!: Boolean;
      public status!: string;
      
      public readonly updatedAt?: Date;
      public readonly deletedAt?: Date;
      public readonly createdAt?: Date;
  
  }


  SavingsGoal.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users', // Name of the target table
          key: 'id',      // Column in Users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      targetAmount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
        allowNull:false,
      },
      
      savedAmount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
        allowNull:false,
      },

      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isLocked: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },

      status: {
        type: DataTypes.ENUM('active', 'completed', 'cancelled'),
        defaultValue: 'active'
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
  }, {
    sequelize,
    modelName: 'SavingsGoal',
  });

  export default SavingsGoal
