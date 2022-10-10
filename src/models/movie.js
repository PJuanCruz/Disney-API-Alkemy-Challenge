const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsToMany(models.Genre, {
        as: 'genres',
        through: 'GenreMovie',
        foreignKey: 'movieId',
      });
      Movie.belongsToMany(models.Character, {
        as: 'characters',
        through: 'CharacterMovie',
        foreignKey: 'movieId',
      });
    }
  }
  Movie.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // type: {
      //   type: DataTypes.ENUM({ values: ['Movie', 'Series'] }),
      //   allowNull: false,
      // },
      imageUrl: {
        type: DataTypes.STRING(2048),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      releaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Movie',
      tableName: 'Movies',
    },
  );
  return Movie;
};
