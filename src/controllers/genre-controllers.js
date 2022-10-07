const genreServices = require('../services/genre-services');

const getGenresList = async (req, res, next) => {
  try {
    const genres = await genreServices.getGenresList();
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGenresList,
};
