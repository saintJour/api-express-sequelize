'use strict';
module.exports = (sequelize, DataTypes) => {
  const Institution = sequelize.define('Institution', {
    name: DataTypes.STRING
  }, {});

  Institution.associate = function(models) {
    models.Institution.Programs = models.Institution.hasMany(models.Program);
  };

  return Institution;

};