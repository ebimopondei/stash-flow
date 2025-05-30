import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../setup'


interface UserAttributes {
    id?: number;
    username?: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    updatedAt?: Date;
    deletedAt?: Date,
    createdAt?: Date,
}


class User extends Model<UserAttributes> implements UserAttributes{
    public id!: number;
    public email!: string;
    public firstname!: string;
    public lastname!: string;
    public username!: string;
    public password!: string;
    
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;

}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { 
          isEmail: true,
        }
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
      
  }, {
    sequelize: sequelize,
    modelName: 'Users',
    hooks: {
      beforeCreate: (user) => {
        if (!user.username && user.firstname) {
          const baseUsername = user.firstname.toLowerCase().replace(/\s+/g, '');
          const randomSuffix = Math.floor(Math.random() * 10000);
          user.username = `${baseUsername}-${randomSuffix}`;
        }
      }
    }
  });

  export default User

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class UserCover extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   UserCover.init({
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'UserCover',
//   });
//   return UserCover;
// };


