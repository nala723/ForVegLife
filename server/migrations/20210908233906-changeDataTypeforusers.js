'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', "profile",{
      type: Sequelize.BLOB('long'),
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', "profile",{
      type: Sequelize.BLOB,
    })
  }
};
