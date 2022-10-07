const { validationResult } = require('express-validator');
const BadRequest = require('../errors/bad-request');

const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((e) => e.msg || '')
      .join(',\n');
    throw new BadRequest(errorMessage);
  }
  next();
};

module.exports = validationHandler;
