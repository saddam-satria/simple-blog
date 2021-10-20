'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        validate: {
          isUUID: 4,
        },
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastActive: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users', null, {});
  },
};
