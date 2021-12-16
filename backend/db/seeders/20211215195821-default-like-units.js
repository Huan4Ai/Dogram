'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Likes', [
      {
        "user_id": 1,
        "post_id": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "user_id": 2,
        "post_id": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "user_id": 3,
        "post_id": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "user_id": 1,
        "post_id": 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "user_id": 2,
        "post_id": 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "user_id": 3,
        "post_id": 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "user_id": 1,
        "post_id": 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "user_id": 1,
        "post_id": 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },


    ], {});


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Likes', null, {});
  }
};
