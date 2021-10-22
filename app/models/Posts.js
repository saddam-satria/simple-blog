'use strict';

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: 4,
        },
      },
      title: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      desc: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      modelName: 'Posts',
      tableName: 'Posts',
    }
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.Authors);
  };
  Posts.beforeCreate((post, _option) => {
    post.createdAt = Date.now();
  });

  Posts.beforeUpdate((post, _option) => {
    post.updatedAt = Date.now();
  });
  return Posts;
};
