const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

('use strict');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: 4,
      },
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email have to be @',
        },
        isLowercase: {
          args: true,
          msg: 'username of email have to be lowercase',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: {
          args: 8,
          msg: 'Password must be 8 characters',
        },
        max: {
          args: 16,
          msg: 'Maximum password is 16 characters',
        },
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastActive: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      allowNull: true,
    },
  });

  Users.beforeCreate(async (user, _option) => {
    const hashPassword = await bcrypt.hash(user.password, 12);
    user.password = hashPassword;
    user.lastActive = Date.now();

    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '3d' });
    user.refreshToken = refreshToken;
  });

  Users.beforeUpdate(async (user, _option) => {
    user.updatedAt = Date.now();
  });
  return Users;
};
