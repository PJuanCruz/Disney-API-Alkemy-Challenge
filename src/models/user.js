const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate() {}
  }
  User.init(
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          isLowercase: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        includePassword: {
          attributes: { include: [] },
        },
      },
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    },
  );
  return User;
};
