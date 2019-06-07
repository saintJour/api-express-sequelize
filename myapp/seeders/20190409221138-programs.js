'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Programs', [{
        InstitutionId: 1,
        name: 'Ingeniería de Ejecución en Informatica',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        InstitutionId: 2,
        name: 'Ingeniería de Ejecución en Computación e Informática',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Programs', null, {});
  }
};