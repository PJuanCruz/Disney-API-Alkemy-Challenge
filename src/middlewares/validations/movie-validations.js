const {
  isMovieIdValid,
  isImageUrlValid,
  isTitleValid,
  isReleaseDateValid,
  isRatingValid,
  isGenresIdValid,
} = require('../../utils/validations');
const validationHandler = require('../validation-handler');

const getMoviesValidations = [isMovieIdValid, validationHandler];

const deleteMoviesValidations = [isMovieIdValid, validationHandler];

const postMoviesValidations = [
  isImageUrlValid,
  isTitleValid,
  isReleaseDateValid,
  isRatingValid,
  isGenresIdValid,
  validationHandler,
];

const putMoviesValidations = [
  isMovieIdValid,
  isImageUrlValid,
  isTitleValid,
  isReleaseDateValid,
  isRatingValid,
  isGenresIdValid,
  validationHandler,
];

module.exports = {
  getMoviesValidations,
  deleteMoviesValidations,
  postMoviesValidations,
  putMoviesValidations,
};
