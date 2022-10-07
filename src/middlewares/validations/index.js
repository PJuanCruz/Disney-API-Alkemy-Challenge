const validationHandler = require('../validation-handler');
const { isEmailValid, isPasswordValid } = require('./user-validations');

const postRegisterValidations = [
  isEmailValid,
  isPasswordValid,
  validationHandler,
];

module.exports = {
  postRegisterValidations,
};
