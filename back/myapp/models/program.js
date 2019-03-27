'use strict';
module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define('Program', {
    name: DataTypes.STRING
  }, {});

  Program.associate = function(models) {
    models.Program.Institution = models.Program.belongsTo(models.Institution);
    models.Program.Semesters = models.Program.hasMany(models.Semester);
  };

  return Program;

};