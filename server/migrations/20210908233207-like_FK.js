'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('users_places_likes', {
      fields: ['place_id'],
      type: 'foreign key',
      name: 'FK_likes_place',
      references: {
        table: 'places',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('users_places_likes', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'FK_likes_user',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('users_places_likes', 'FK_likes_place');
    await queryInterface.removeConstraint('users_places_likes', 'FK_likes_user');
  }
};
