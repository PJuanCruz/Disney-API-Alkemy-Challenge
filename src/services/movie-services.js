const { Op } = require('sequelize');
const { Movie } = require('../models');

const createMovie = async ({
  imageUrl,
  title,
  releaseDate,
  rating,
  genresId,
}) => {
  const newMovie = await Movie.create({
    imageUrl,
    title,
    releaseDate,
    rating,
  });
  await newMovie.addGenre(genresId);
  return newMovie;
};

const getMovieList = async ({ name, genre, order }) => {
  const queryObj = {};
  const genresQueryObj = {};

  if (name) {
    queryObj.title = { [Op.iLike]: `%${name}%` };
  }
  if (genre) {
    genresQueryObj.genreId = { [Op.eq]: genre };
  }

  const movies = await Movie.findAll({
    where: queryObj,
    attributes: ['movieId', 'title', 'imageUrl', 'releaseDate'],
    include: {
      association: 'genres',
      where: genresQueryObj,
      attributes: [],
      through: { attributes: [] },
    },
    order: [['releaseDate', order]],
  });
  return movies;
};

const getMovieDetail = async (movieId) => {
  const movie = await Movie.findByPk(movieId, {
    include: [
      {
        association: 'characters',
        attributes: ['name', 'imageUrl'],
        through: { attributes: [] },
      },
      {
        association: 'genres',
        attributes: ['name', 'imageUrl'],
        through: { attributes: [] },
      },
    ],
  });
  return movie;
};

const deleteMovieById = async (movieId) => {
  const result = await Movie.destroy({ where: { movieId } });
  return result;
};

const updateMovie = async ({
  movieId,
  imageUrl,
  title,
  releaseDate,
  rating,
  genresId,
}) => {
  const movie = await Movie.findByPk(movieId);
  await movie.update({
    imageUrl,
    title,
    releaseDate,
    rating,
  });
  await movie.setGenres(genresId);
};

const getMovieByTitle = async (title) => {
  const movie = await Movie.findOne({ where: { title } });
  return movie;
};

module.exports = {
  createMovie,
  getMovieList,
  getMovieDetail,
  deleteMovieById,
  updateMovie,
  getMovieByTitle,
};
