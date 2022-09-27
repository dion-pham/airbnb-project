'use strict';
// const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'nfl.com',
        preview: true,
      },
      {
        spotId: 1,
        url: 'nba.com',
        preview: true,
      },
      {
        spotId: 2,
        url: 'yahoo.com',
        preview: true,
      },
      {
        spotId: 2,
        url: 'google.com',
        preview: false,
      },
      {
        spotId: 3,
        url: 'mozilla.com',
        preview: false,
      },
      {
        spotId: 3,
        url: 'chrome.com',
        preview: false,
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
