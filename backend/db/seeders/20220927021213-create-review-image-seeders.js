'use strict';
// const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'mlb.com',
      },
      {
        reviewId: 1,
        url: 'mls.com',
      },
      {
        reviewId: 2,
        url: 'nba.com',
      },
      {
        reviewId: 2,
        url: 'wnba.com',
      },
      {
        reviewId: 3,
        url: 'nhl.com',
      },
      {
        reviewId: 3,
        url: 'nfl.com',
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
