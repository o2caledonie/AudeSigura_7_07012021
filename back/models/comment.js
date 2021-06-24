'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner'
      })
      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post'
      })
    }
  };
  Comment.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};