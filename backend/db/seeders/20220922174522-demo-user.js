'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Dion',
        lastName: 'Pham',
        email: 'demo@user.io',
        username: 'phamsome',
        hashedPassword: bcrypt.hashSync('pass1word')
      },
      {
        firstName: 'Ben',
        lastName: 'Thai',
        email: 'user1@user.io',
        username: 'Benties',
        hashedPassword: bcrypt.hashSync('pass2word')
      },
      {
        firstName: 'William',
        lastName: 'Ngo',
        email: 'user2@user.io',
        username: 'JisooFan',
        hashedPassword: bcrypt.hashSync('pass3word')
      },
      {
        firstName: 'Kyle',
        lastName: 'Solano',
        email: 'user3@user.io',
        username: 'MrSolano',
        hashedPassword: bcrypt.hashSync('pass4word')
      },
      {
        firstName: 'Allen',
        lastName: 'Pham',
        email: 'user4@user.io',
        username: 'Phamuz',
        hashedPassword: bcrypt.hashSync('pass5word')
      },
      {
        firstName: 'Sebastian',
        lastName: 'Antonucci',
        email: 'user5@user.io',
        username: 'Reptar',
        hashedPassword: bcrypt.hashSync('pass6word')
      },
      {
        firstName: 'Brin',
        lastName: 'Hoover',
        email: 'user6@user.io',
        username: 'Blee',
        hashedPassword: bcrypt.hashSync('pass7word')
      },
      {
        firstName: 'Mathew',
        lastName: 'Li',
        email: 'user7@user.io',
        username: 'WatermelonSoju',
        hashedPassword: bcrypt.hashSync('pass8word')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['phamsome', 'Benties', 'JisooFan', 'MrSolano', 'Phamuz', 'Reptar', 'Blee', 'WatermelonSoju'] }
    }, {});
  }
};
