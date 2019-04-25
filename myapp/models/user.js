'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    emailToken: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM('normal', 'admin')
    },
    verified: {
        type: DataTypes.BOOLEAN
    },
    avatar: {
        type: DataTypes.STRING
    }
  });

  User.associate = function(models) {
    models.User.Program = models.User.belongsTo(models.Program);
    models.User.Documents = models.User.hasMany(models.Document);
  };

  return User;
};