'use strict';
module.exports = (sequelize, DataTypes) => {
  const DocumentTag = sequelize.define('DocumentTag', {
    DocumentId: {
      type: DataTypes.INTEGER
    },
    TagId: {
        type: DataTypes.INTEGER
    }
  });

  DocumentTag.associate = function(models) {
    models.DocumentTag.Document = models.DocumentTag.belongsTo(models.Document);
    models.DocumentTag.Tag = models.DocumentTag.belongsTo(models.Tag);
  };

  return DocumentTag;
};