'use strict';
// const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://i.imgur.com/OCQQlAX.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/nhj3jLn.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/nsHRMSn.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/aRA1ZCa.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/Lhpmbgo.jpg',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/m5qIE2K.jpg',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://i.imgur.com/JMjzPmW.png',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/g3NSFUQ.png',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://i.imgur.com/bZ7eWEH.jpg',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://i.imgur.com/KMfQrLj.png',
        preview: true,
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
