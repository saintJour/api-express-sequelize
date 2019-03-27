'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});

  Tag.associate = function(models) {
    models.Tag.DocumentTags = models.Tag.hasMany(models.DocumentTag);
  };

  return Tag;

};