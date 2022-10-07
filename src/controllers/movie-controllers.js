const BadRequest = require('../errors/bad-request');
const movieServices = require('../services/movie-services');

const createMovie = async (req, res, next) => {
  const { imageUrl, title, releaseDate, rating, genresId } = req.body;
  try {
    const newMovie = await movieServices.createMovie({
      imageUrl,
      title,
      releaseDate,
      rating,
      genresId,
    });
    const newMovieDetail = await movieServices.getMovieDetail(newMovie.movieId);
    res.status(201).json(newMovieDetail);
  } catch (error) {
    next(error);
  }
};

const getMovieList = async (req, res, next) => {
  const { name, genre, order } = req.query;
  try {
    const genres = await movieServices.getMovieList({
      name,
      genre,
      order: order === 'ASC' ? 'ASC' : 'DESC',
    });
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
};

const getMovieDetail = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await movieServices.getMovieDetail(movieId);
    if (!movie) {
      throw new BadRequest('El ID no corresponde a ninguna película o serie');
    }
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

const deleteMovieById = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const result = await movieServices.deleteMovieById(movieId);
    if (!result) {
      throw new BadRequest('El ID no corresponde a ninguna película o serie');
    }
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const { imageUrl, title, releaseDate, rating, genresId } = req.body;
  try {
    await movieServices.updateMovie({
      movieId,
      imageUrl,
      title,
      releaseDate,
      rating,
      genresId,
    });
    const movieUpdatedDetail = await movieServices.getMovieDetail(movieId);
    res.status(201).json(movieUpdatedDetail);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMovie,
  getMovieList,
  getMovieDetail,
  deleteMovieById,
  updateMovie,
};
