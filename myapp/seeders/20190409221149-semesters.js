'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Semesters', [{
        ProgramId: 1,
        name: 'I Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 1,
        name: 'II Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 1,
        name: 'III Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 1,
        name: 'IV Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 1,
        name: 'V Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 1,
        name: 'VI Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 1,
        name: 'VII Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 1,
        name: 'VIII Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 2,
        name: 'I Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 2,
        name: 'II Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 2,
        name: 'III Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 2,
        name: 'IV Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 2,
        name: 'V Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 2,
        name: 'VI Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 2,
        name: 'VII Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        ProgramId: 2,
        name: 'VIII Semestre',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Semesters', null, {});
  }
};