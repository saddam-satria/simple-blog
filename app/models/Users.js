const bcrypt = require('bcrypt');

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
      allowNull: true,
      defaultValue: '/static/img/assets/dummy-picture.png',
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    lastActive: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Users.beforeCreate(async (user, _option) => {
    const hashPassword = await bcrypt.hash(user.password, 12);
    user.password = hashPassword;
    user.lastActive = Date.now();
    user.createdAt = Date.now();
  });

  Users.beforeUpdate((user,_option) => {
    user.password = "saddam"
  })

  Users.associate = (models) => {
    Users.hasOne(models.Authors);
  };
  return Users;
};
