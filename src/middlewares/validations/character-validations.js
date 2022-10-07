const { param } = require('express-validator');

const isCharacterIdValid = param('characterId')
  .isInt({ min: 1 })
  .withMessage('Formato de ID inválido');

module.exports = {
  isCharacterIdValid,
};
