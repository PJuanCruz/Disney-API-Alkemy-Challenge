const express = require('express');
const movieControllers = require('../controllers/movie-controllers');

const router = express.Router();

router
  .route('/')
  .get(movieControllers.getMovieList)
  .post(movieControllers.createMovie);
router
  .route('/:movieId')
  .get(movieControllers.getMovieDetail)
  .put(movieControllers.updateMovie)
  .delete(movieControllers.deleteMovieById);

module.exports = router;
