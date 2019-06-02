'use strict';
module.exports = (sequelize, DataTypes) => {
  const SavedDocument = sequelize.define('SavedDocument', {
    UserId: {
        type: DataTypes.INTEGER
    },
    DocumentId: {
        type: DataTypes.INTEGER
    }
  });

  SavedDocument.associate = function(models) {
    models.SavedDocument.Document = models.SavedDocument.belongsTo(models.Document);
    models.SavedDocument.User = models.SavedDocument.belongsTo(models.User);
  };

  return SavedDocument;

};