'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('SavedDocuments', ['UserId', 'DocumentId'], {
      type: 'unique',
      name: 'uq_saved_documents_userid_documentid'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('SavedDocuments', 'uq_saved_documents_userid_documentid');
  }
};