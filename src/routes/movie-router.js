const express = require('express');
const movieControllers = require('../controllers/movie-controllers');
const authenticateToken = require('../middlewares/authenticate-token');
const {
  getMoviesValidations,
  deleteMoviesValidations,
  postMoviesValidations,
  putMoviesValidations,
} = require('../middlewares/validations/movie-validations');

const router = express.Router();

router.route('/')
  .get(
    [authenticateToken],
    movieControllers.getMovieList,
  )
  .post(
    [authenticateToken, ...postMoviesValidations],
    movieControllers.createMovie,
  );

router.route('/:movieId')
  .get(
    [authenticateToken, ...getMoviesValidations],
    movieControllers.getMovieDetail,
  )
  .delete(
    [authenticateToken, ...deleteMoviesValidations],
    movieControllers.deleteMovieById,
  )
  .put(
    [authenticateToken, ...putMoviesValidations],
    movieControllers.updateMovie,
  );

module.exports = router;
