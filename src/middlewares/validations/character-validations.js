const {
  isImageUrlValid,
  isNameValid,
  isAgeValid,
  isWeightValid,
  isStoryValid,
  isMoviesIdValid,
  isCharacterIdValid,
} = require('../../utils/validations');
const validationHandler = require('../validation-handler');

const getCharactersValidations = [isCharacterIdValid, validationHandler];

const deleteCharactersValidations = [isCharacterIdValid, validationHandler];

const postCharactersValidations = [
  isImageUrlValid,
  isNameValid,
  isAgeValid,
  isWeightValid,
  isStoryValid,
  isMoviesIdValid,
  validationHandler,
];

const putCharactersValidations = [
  isCharacterIdValid,
  isImageUrlValid,
  isNameValid,
  isAgeValid,
  isWeightValid,
  isStoryValid,
  isMoviesIdValid,
  validationHandler,
];

module.exports = {
  getCharactersValidations,
  deleteCharactersValidations,
  postCharactersValidations,
  putCharactersValidations,
};
