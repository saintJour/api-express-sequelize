'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: DataTypes.STRING
  }, {});

  Course.associate = function(models) {
    models.Course.Semester = models.Course.belongsTo(models.Semester);
    models.Course.Documents = models.Course.hasMany(models.Document);
  };

  return Course;

};