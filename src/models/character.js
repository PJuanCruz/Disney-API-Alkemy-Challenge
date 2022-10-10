const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
      Character.belongsToMany(models.Movie, {
        as: 'movies',
        through: 'CharacterMovie',
        foreignKey: 'characterId',
      });
    }
  }
  Character.init(
    {
      characterId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      imageUrl: {
        type: DataTypes.STRING(2048),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      story: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Character',
      tableName: 'Characters',
    },
  );
  return Character;
};
