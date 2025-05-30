'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface:QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('SavingsGoals', {
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

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      targetAmount: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        allowNull:false,
      },
      
      savedAmount: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        allowNull:false,
      },

      deadline: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      isLocked: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },

      status: {
        type: Sequelize.ENUM('active', 'completed', 'cancelled'),
        defaultValue: 'active'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface:QueryInterface) {
    await queryInterface.dropTable('SavingsGoals');
  }
};