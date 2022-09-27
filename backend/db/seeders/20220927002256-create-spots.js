'use strict';
// const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      // {
      //   ownerId: 1,
      //   address: ,
      //   city: ,
      //   state:,
      //   country: ,
      //   lat: ,
      //   lng: ,
      //   name: ,
      //   description: ,
      //   price: ,
      // },
      // {
      //   ownerId: 1,
      //   address: ,
      //   city: ,
      //   state:,
      //   country: ,
      //   lat: ,
      //   lng: ,
      //   name: ,
      //   description: ,
      //   price: ,
      // },
      // {
      //   ownerId: 1,
      //   address: ,
      //   city: ,
      //   state:,
      //   country: ,
      //   lat: ,
      //   lng: ,
      //   name: ,
      //   description: ,
      //   price: ,
      // }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
