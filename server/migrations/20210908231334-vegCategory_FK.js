'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('vegCategories', {
      fields: ['place_id'],
      type: 'foreign key',
      name: 'FK_vegCategory',
      references: {
        table: 'places',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('vegCategories', 'FK_vegCategory');
  }
};
