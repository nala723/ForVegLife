'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('menuprices', {
      fields: ['place_id'],
      type: 'foreign key',
      name: 'FK_menuprices',
      references: {
        table: 'places',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('menuprices', 'FK_menuprices')
  }
};
