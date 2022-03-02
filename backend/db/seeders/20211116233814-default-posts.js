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
    return queryInterface.bulkInsert(
      "Posts",
      [
        {
          user_id: 1,
          description: "Do you want a flower?",
          photo_url:
            "https://images.unsplash.com/photo-1552053831-71594a27632d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          description: "I'm looking at you, my master ^",
          photo_url:
            "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          description: "Thank you ^",
          photo_url:
            "https://images.unsplash.com/photo-1554830072-52d78d0d4c18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          description: "Smiling Angel ^",
          photo_url:
            "https://dogram.s3.us-east-2.amazonaws.com/1641082169438.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          description: "Under the sun",
          photo_url:
            "https://dogram.s3.us-east-2.amazonaws.com/1641084152105.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          description: "Wondering..",
          photo_url:
            "https://dogram.s3.us-east-2.amazonaws.com/1641085083415.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
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
