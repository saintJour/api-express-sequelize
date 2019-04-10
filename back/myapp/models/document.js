'use strict';
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM('note', 'book', 'test', 'exam')
    },
    year: {
      type: DataTypes.INTEGER
    },
    rating: {
      type: DataTypes.DECIMAL(10,2)
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    key: {
      type: DataTypes.STRING
    },
    thumbnailKey: {
      type: DataTypes.STRING
    },
    approved: {
      type: DataTypes.BOOLEAN
    }
  });

  Document.associate = function(models) {
    models.Document.Course = models.Document.belongsTo(models.Course);
    models.Document.DocumentTags = models.Document.hasMany(models.DocumentTag);
    models.Document.Ratings = models.Document.hasMany(models.Rating);
  };

  return Document;
};