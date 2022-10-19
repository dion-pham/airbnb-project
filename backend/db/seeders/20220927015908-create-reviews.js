'use strict';
// const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'Looks just like it from the show!',
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Call me Watson, you are Sherlock',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Lori Loughlin was my childhood crush',
        stars: 5
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Used to love watching full house as a kid',
        stars: 4
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Avadakabrah!',
        stars: 3
      },
      {
        spotId: 3,
        userId: 5,
        review: 'Was bombarded by tourists during my stay. would not recommend',
        stars: 2
      },
      {
        spotId: 4,
        userId: 5,
        review: 'Drug free establishment, i really enjoyed my stay',
        stars: 5
      },
      {
        spotId: 4,
        userId: 6,
        review: 'Found a pizza on the roof when I was there...',
        stars: 2
      },
      {
        spotId: 5,
        userId: 6,
        review: 'Felt like a fresh-prince for the weekend. love it',
        stars: 5
      },
      {
        spotId: 5,
        userId: 7,
        review: 'Comes with an in-house butler!',
        stars: 5
      },
      {
        spotId: 6,
        userId: 7,
        review: 'nice amenities',
        stars: 3
      },
      {
        spotId: 6,
        userId: 8,
        review: 'owner was very prompt in communication',
        stars: 5
      },
      {
        spotId: 7,
        userId: 8,
        review: 'very nice spot for a weekend alone with my significant other. would recommend',
        stars: 4
      },
      {
        spotId: 7,
        userId: 2,
        review: 'would stay again!',
        stars: 4
      },
      {
        spotId: 8,
        userId: 3,
        review: 'no vampires or werewolves thankfully. nice spot',
        stars: 4
      },
      {
        spotId: 8,
        userId: 4,
        review: 'team jacob or team edward? doesnt matter, any team would feel welcome here. i really enjoyed my stay',
        stars: 4
      },
      {
        spotId: 9,
        userId: 5,
        review: 'There are people still living here and shoo away tourists. do not recommends',
        stars: 4
      },
      {
        spotId: 9,
        userId: 6,
        review: 'truly a house for a multimillionaire superhero',
        stars: 5
      },
      {
        spotId: 9,
        userId: 1,
        review: 'hard to find on google maps but once i got there, it was a great time',
        stars: 3
      },
      {
        spotId: 10,
        userId: 7,
        review: 'very nice of the host to provide complimentary liquor',
        stars: 4
      },
      {
        spotId: 10,
        userId: 8,
        review: 'never watched New Girl, but i felt like a new man after staying here',
        stars: 5
      },
      {
        spotId: 10,
        userId: 1,
        review: 'honestly, this place sucked',
        stars: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }
    }, {});
  }
};
