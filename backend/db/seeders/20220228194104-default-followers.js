"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Followers",
      [
        {
          "followerId": 1,
          "followingId": 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          "followerId": 2,
          "followingId": 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          "followerId": 1,
          "followingId": 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          "followerId": 3,
          "followingId": 1,
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
    return queryInterface.bulkDelete("Followers", null, {});
  },
};
