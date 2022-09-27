'use strict';
// const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '221B Baker Street',
        city: 'London',
        state: 'England',
        country: 'United Kingdom',
        lat: 43.438641,
        lng: -80.559067,
        name: 'Residence of Sherlock Holmes',
        description: 'Home of the greatest detective of all time',
        price: 1000.50,
      },
      {
        ownerId: 2,
        address: '1709 Broderick St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.786320,
        lng: -122.442139,
        name: 'Full House House',
        description: 'Everywhere you look, everywhere you go',
        price: 2000.50,
      },
      {
        ownerId: 3,
        address: '4 Privet Drive',
        city: 'Surrey',
        state: 'England',
        country: 'United Kingdom',
        lat: 51.410992,
        lng: -2.603880,
        name: 'The Durselys House from Harry Potter',
        description: 'Come see Harrys room undernear the stairs',
        price: 3000.50,
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ['Residence of Sherlock Holmes', 'Full House House', 'The Durselys House from Harry Potter'] }
    }, {});
  }
};
