'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: "https://dogram.s3.us-east-2.amazonaws.com/icon.jpg",
        about: "A dog lover",
      },
      {
        email: 'DogFan@gmail.com',
        username: 'DogFan',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: "https://dogram.s3.us-east-2.amazonaws.com/icon.jpg",
        about: "A dog lover",
      },
      {
        email: 'PuppyLover@gmail.com',
        username: 'PuppyLover',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: "https://dogram.s3.us-east-2.amazonaws.com/icon.jpg",
        about: "A dog lover",
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
