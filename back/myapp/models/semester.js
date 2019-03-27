'use strict';
module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define('Semester', {
    name: DataTypes.STRING
  }, {});

  Semester.associate = function(models) {
    models.Semester.Program = models.Semester.belongsTo(models.Program);
    models.Semester.Courses = models.Semester.hasMany(models.Course);
  };

  return Semester;

};