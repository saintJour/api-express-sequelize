'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Ratings', ['UserId', 'DocumentId'], {
      type: 'unique',
      name: 'uq_ratings_userid_documentid'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Ratings', 'uq_ratings_userid_documentid');
  }
};