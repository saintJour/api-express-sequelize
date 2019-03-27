'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('DocumentTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DocumentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Documents',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      TagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('DocumentTags');
  }
};
