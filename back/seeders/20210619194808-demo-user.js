'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      userName: 'John Doe',
      email: 'demo@demo.com',
      password: await bcrypt.hash('password', 10),
      avatar:'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
