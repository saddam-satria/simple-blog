'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      firstName: 'Saddam',
      lastName: 'Satria',
      email: 'ardhisaddam1@gmail.com',
      password: 'saddam1209',
      image: 'nodejs.jpg',
    }]);
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete("Users", null ,{})
  },
};
