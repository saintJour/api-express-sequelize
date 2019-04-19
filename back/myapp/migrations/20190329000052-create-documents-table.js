'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      CourseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Courses',
          key: 'id'
        },
        onDelete: 'set null'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('note', 'book', 'test', 'exam')
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.DECIMAL(10,2)
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      key: {
        type: Sequelize.STRING
      },
      thumbnailKey: {
        type: Sequelize.STRING
      },
      approved: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Documents');
  }
};
