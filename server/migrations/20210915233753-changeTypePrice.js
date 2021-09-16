'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('menuprices', 'price', {
      type: Sequelize.INTEGER
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('menuprices', 'price', {
      type: Sequelize.STRING
    })
  }
};
