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
    return queryInterface.bulkInsert('Posts', [
      {
        "id": 1,
        "user_id": 1,
        "description": "Do you want a flower?",
        "photo_url": "https://images.unsplash.com/photo-1552053831-71594a27632d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 2,
        "user_id": 1,
        "description": "I'm looking at you, my master ^",
        "photo_url": "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 3,
        "user_id": 2,
        "description": "Running in the sea ^",
        "photo_url": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=688&q=80",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 4,
        "user_id": 3,
        "description": "Running in the sea ^",
        "photo_url": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=688&q=80",
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
    return queryInterface.bulkDelete('Posts', null, {});

  }
};
