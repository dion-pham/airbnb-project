'use strict';
// const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('January 1, 2023'),
        endDate: new Date('January 2, 2023'),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('February 1, 2023'),
        endDate: new Date('February 2, 2023')
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('March 1, 2023'),
        endDate: new Date('March 2, 2023'),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
