const genreServices = require('../services/genre-services');

const create = async (req, res, next) => {
  const { name, imageUrl } = req.body;
  try {
    const newGenre = await genreServices.create({ name, imageUrl });
    res.status(201).json(newGenre);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const genres = await genreServices.getAll();
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};
