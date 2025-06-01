'use strict';

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../setup";

interface WalletsAttribute {
    id?: string;
    main: string;
    sub: string;
    userId: string;

    
    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}

class Wallets extends Model<WalletsAttribute> implements WalletsAttribute{
    public id!: string;
    public main!: string;
    public sub!: string;
    public userId!: string;

    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
}

Wallets.init({
  id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
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

  main: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  
  sub: { 
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  }
}, {
  sequelize,
  modelName: 'Wallets',
});


export default Wallets