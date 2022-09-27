'use strict';
// const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'google.com',
        preview: true,
      },
      {
        spotId: 2,
        url: 'google.com',
        preview: true,
      },
      {
        spotId: 3,
        url: 'google.com',
        preview: true,
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
