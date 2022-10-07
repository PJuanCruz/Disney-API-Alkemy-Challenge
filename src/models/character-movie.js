const { Model } = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Movie.init(
    {},
    {
      sequelize,
      modelName: 'CharacterMovie',
      tableName: 'Characters_Movies',
    },
  );
  return Movie;
};
