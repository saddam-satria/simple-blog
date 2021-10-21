('use strict');

module.exports = (sequelize, DataTypes) => {
  const Authors = sequelize.define(
    'Authors',
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
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      city: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      birthDay: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      modelName: 'Authors',
      tableName: 'Authors',
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  Authors.associate = (models) => {
    Authors.belongsTo(models.Users);
    Authors.hasMany(models.Posts);
  };

  return Authors;
};
