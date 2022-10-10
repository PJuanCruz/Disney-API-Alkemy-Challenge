const { isEmailValid, isPasswordValid } = require('../../utils/validations');
const validationHandler = require('../validation-handler');

const registerValidations = [isEmailValid, isPasswordValid, validationHandler];

module.exports = {
  registerValidations,
};
