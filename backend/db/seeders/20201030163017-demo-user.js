'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'DemoDoggy',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: "https://dogram.s3.us-east-2.amazonaws.com/icon.jpg",
        about: "Hi I'm a demo doggy^",
      },
      {
        email: 'DogFan@gmail.com',
        username: 'DogFan',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: "https://dogram.s3.us-east-2.amazonaws.com/dogfan_icon.jpg",
        about: "A dog fan",
      },
      {
        email: 'PuppyLover@gmail.com',
        username: 'PuppyLover',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: "https://dogram.s3.us-east-2.amazonaws.com/corgi_icon.png",
        about: "A puppy lover",
      },
      {
        email: 'SamoyedLover@gmail.com',
        username: 'SamoyedLover',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: "https://dogram.s3.us-east-2.amazonaws.com/samoyed_icon.png",
        about: "A samoyed lover",
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['DemoDoggy', 'DogFan', 'PuppyLover'] }
    }, {});
  }
};
