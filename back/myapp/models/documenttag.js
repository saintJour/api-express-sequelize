'use strict';
module.exports = (sequelize, DataTypes) => {
  const DocumentTag = sequelize.define('DocumentTag', {

  });

  DocumentTag.associate = function(models) {
    models.DocumentTag.Document = models.DocumentTag.belongsTo(models.Document);
    models.DocumentTag.Tag = models.DocumentTag.belongsTo(models.Tag);
  };

  return DocumentTag;
};