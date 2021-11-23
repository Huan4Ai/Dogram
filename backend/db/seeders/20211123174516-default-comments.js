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
    return queryInterface.bulkInsert('Comments', [
      {
        "id": 1,
        "user_id": 1,
        "post_id": 1,
        "content": "What a cute puppy!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 2,
        "user_id": 1,
        "post_id": 1,
        "content": "I love it!",
        createdAt: new Date(),
        updatedAt: new Date()
      }


    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
