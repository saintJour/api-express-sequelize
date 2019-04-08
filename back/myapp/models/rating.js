'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    value: {
        type: DataTypes.INTEGER
    }
  });

  Rating.associate = function(models) {
    models.Rating.Document = models.Rating.belongsTo(models.Document);
  };

  return Rating;

};