'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('reviews', {
      fields: ['place_id'],
      type: 'foreign key',
      name: 'FK_reviews_place',
      references: {
        table: 'places',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('reviews', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'FK_reviews_user',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('reviews', 'FK_reviews_place');
    await queryInterface.removeConstraint('reviews', 'FK_reviews_user');
  }
};
