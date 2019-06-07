'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Courses', [{
        SemesterId: 1,
        name: 'INF1240 Introducción a la Ingeniería Informática',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 1,
        name: 'MAT1196 Fundamentos de Matemáticas',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 1,
        name: 'QUI1149 Fundamentos de Química',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 1,
        name: 'INF1141 Fundamentos de Algoritmos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 2,
        name: 'MAT1166 Fundamentos de Cálculo',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 2,
        name: 'MAT1169 Fundamentos de Álgebra Lineal',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 2,
        name: 'INF1140 Electrónica Digital',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 2,
        name: 'INF1142 Fundamentos de Programación',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 3,
        name: 'INF2240 Estructura de Datos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 3,
        name: 'INF2340 Arquitectura de Hardware',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 3,
        name: 'MAT2178 Cálculo Integral',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 3,
        name: 'FIS2109 Fundamentos de Física',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 3,
        name: 'ICA2120 Administración de Empresas',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 4,
        name: 'INF2241 Programación Orientada a Objetos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 4,
        name: 'INF2341 Sistemas Operativos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 4,
        name: 'INF2243 Base de Datos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 4,
        name: 'EST2168 Fundamentos de Probabilidad',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 4,
        name: 'ICA2160 Economía',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 5,
        name: 'INF3242 Modelamiento de Sistemas de Software',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 5,
        name: 'INF3340 Redes de Computadores',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 5,
        name: 'INF3144 Investigación de Operaciones',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 6,
        name: 'INF3241 Ingeniería de Software',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 6,
        name: 'INF3240 Ingeniería Web',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 6,
        name: 'INF3540 Taller de Base de Datos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 6,
        name: 'INF3140 Finanzas',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 7,
        name: 'INF4540 Taller de Ingeniería de Software',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 7,
        name: 'INF4243 Ingeniería de Requerimientos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 8,
        name: 'INF4541 Proyecto de Título',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 9,
        name: 'Cálculo I para Ingeniería',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 9,
        name: 'Álgebra I para Ingeniería',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 9,
        name: 'Física I para ingeniería',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 9,
        name: 'Introducción a la Ingeniería',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 10,
        name: 'Cálculo II para Ingeniería',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 10,
        name: 'Álgebra II para Ingeniería',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 10,
        name: 'Física II para Ingeniería',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 10,
        name: 'Fundamentos de Computación y Programación',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 10,
        name: 'Química General',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 11,
        name: 'Electricidad y Magnetismo para Ingeniería',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 11,
        name: 'Análisis Estadístico para Ingeniería',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 11,
        name: 'Ecuaciones Diferenciales y Métodos Numéricos para Ingeniería',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 11,
        name: 'Métodos de Programación',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 12,
        name: 'Fundamentos de Economía',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 12,
        name: 'Ingeniería de Sistemas',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 12,
        name: 'Estructura de Computadores',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 12,
        name: 'Paradigmas de Programación',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 12,
        name: 'Análisis de Algoritmos y Estructura de Datos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 13,
        name: 'Evaluación y Gestión de Proyectos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 13,
        name: 'Diseño de Bases de Datos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 13,
        name: 'Organización de Computadores',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 13,
        name: 'Fundamentos de Ingeniería de Software',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 13,
        name: 'Sistemas de Información',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 14,
        name: 'Administración y Gestión Informática',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 14,
        name: 'Taller de Bases de Datos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 14,
        name: 'Sistemas Operativos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 14,
        name: 'Técnicas de Ingeniería de Software',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 14,
        name: 'Redes Computacionales',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 15,
        name: 'Proyecto de Ingeniería de Software',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 15,
        name: 'Seminario de Computación e Informática',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        SemesterId: 16,
        name: 'Trabajo de Titulación',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Courses', null, {});
  }
};