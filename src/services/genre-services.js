const { Genre } = require('../models');

const getGenresList = async () => {
  const genres = await Genre.findAll();
  return genres;
};

const getGenreById = async (genreId) => {
  const genre = await Genre.findByPk(genreId);
  return genre;
};

module.exports = {
  getGenresList,
  getGenreById,
};
