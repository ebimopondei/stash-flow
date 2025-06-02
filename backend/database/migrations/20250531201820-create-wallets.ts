'use strict';

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface:QueryInterface, Sequelize: typeof DataTypes) {
    return queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.createTable('Transactions', {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
    
          goalsId: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
              model: 'SavingsGoals', // Name of the target table
              key: 'id',      // Column in Users table
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          
          userId: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
              model: 'Users', // Name of the target table
              key: 'id',      // Column in Users table
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
    
          type: {
            type: Sequelize.ENUM('deposit', 'deposit_goal', 'fund_goal', 'withdrawal', 'disbursement'),
            allowNull: false,
          },
          
          amount: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0.0
    
          },
    
          from: {
            type: Sequelize.ENUM('goal', 'wallet', 'main', 'sub', 'external'),
            allowNull: false,
          },
    
          to: {
            type: Sequelize.ENUM('goal', 'wallet', 'main', 'sub', 'external'),
            allowNull: false,
          },
    
          description: {
            type: Sequelize.STRING,
            allowNull: true
          },
    
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        },
        { transaction: t }),
    
        queryInterface.createTable('Wallets', {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
    
          userId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'Users', // Name of the target table
              key: 'id',      // Column in Users table
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
    
          main: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0.0
          },
          
          sub: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0.0
    
          },
    
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        },
      { transaction: t }),
    
        queryInterface.addColumn(
          'Users',
          'frequency', 
          { 
            type: Sequelize.ENUM('daily', 'weekly', 'monthly',  'quarterly'), 
            allowNull: false, 
            defaultValue: 'daily'
          }, 
          { transaction: t}
        )

      ])
    })
  },
  async down(queryInterface:QueryInterface) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all( [
        queryInterface.dropTable('Wallets', { transaction: t}),
        queryInterface.dropTable('Transactions', { transaction: t}),
        queryInterface.dropTable('Transactionss', { transaction: t}),
        queryInterface.removeColumn('Users', 'frequency', { transaction: t})
      ])
    })
  }
};