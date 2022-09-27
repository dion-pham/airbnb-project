'use strict';
// const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'google.com',
      },
      {
        reviewId: 1,
        url: 'google.com',
      },
      {
        reviewId: 2,
        url: 'google.com',
      },
      {
        reviewId: 2,
        url: 'google.com',
      },
      {
        reviewId: 3,
        url: 'google.com',
      },
      {
        reviewId: 3,
        url: 'google.com',
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ReviewImages', {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
