const { Genre } = require('../models');

const getGenresList = async () => {
  const genres = await Genre.findAll();
  return genres;
};

module.exports = {
  getGenresList,
};
