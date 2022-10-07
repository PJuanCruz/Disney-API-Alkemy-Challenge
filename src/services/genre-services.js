const { Genre } = require('../models');

const create = async ({ name, imageUrl }) => {
  const newGenre = await Genre.create({ name, imageUrl });
  return newGenre;
};

const getAll = async () => {
  const genres = await Genre.findAll();
  return genres;
};

module.exports = {
  create,
  getAll,
};
