const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      Genre.belongsToMany(models.Movie, {
        as: 'movies',
        through: 'GenreMovie',
        foreignKey: 'genreId',
      });
    }
  }
  Genre.init(
    {
      genreId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Genre',
      tableName: 'Genres',
      timestamps: false,
    },
  );
  return Genre;
};
