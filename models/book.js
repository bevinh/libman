'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Please enter a title"
            }
        }
    },
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    first_published: DataTypes.INTEGER
  },
      {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return Book;
};