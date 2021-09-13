'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('places', 'address', Sequelize.STRING, {
      after: 'title'
    });

    await queryInterface.addColumn('places', 'picture_url', Sequelize.STRING, {
      after: 'address'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('places', 'address');
    await queryInterface.removeColumn('places', 'picture_url');
  }
};
