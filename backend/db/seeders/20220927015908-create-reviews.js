'use strict';
// const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 3,
        review: 'Looks just like it from the show!',
        stars: 4.5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Call me Watson, you are Sherlock',
        stars: 4.3
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Brings me back to my childhood',
        stars: 4.7
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Used to love watching full house as a kid',
        stars: 4.2
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Avadakabrah!',
        stars: 3.9
      },
      {
        spotId: 3,
        userId: 2,
        review: 'There are people still living here and shoo away tourists. do not recommends',
        stars: 3.5
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
