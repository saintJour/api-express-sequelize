'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Institutions', [{
        name: 'Pontificia Universidad Católica de Valparaíso',
        imageUrl: 'https://www.latercera.com/wp-content/uploads/2018/11/PUCV.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Universidad de Santiago de Chile',
        imageUrl: 'http://lanacion.cl/wp-content/uploads/2018/02/usach.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Institutions', null, {});
  }
};