'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      ownerId: 3,
      content: 'Lorem ipsum dolor sit amet',
      image: 'https://outremers360.com/wp-media/uploads/2020/07/21big-1.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
