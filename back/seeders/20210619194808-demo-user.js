'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      userName: 'John Doe',
      email: 'demo@demo.com',
      password: await bcrypt.hash('Johndemo!', 10),
      avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userName: 'user1',
      email: 'user1@demo.com',
      password: await bcrypt.hash('User1demo!', 10),
      avatar: 'https://4.bp.blogspot.com/-1jkYOEULl2o/Tx9hCKLOvBI/AAAAAAAAlZU/h_9x7ANCf7Q/s1600/funny-facebook-default-pictures_3.png',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userName: 'Moderator',
      email: 'moderator@demo.com',
      password: await bcrypt.hash('Moderatordemo!', 10),
      avatar: 'https://i.pinimg.com/originals/6c/87/11/6c87118cc37428689a1af22da338b134.jpg',
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
