const { body } = require('express-validator');
const BadRequest = require('../../errors/bad-request');
const userServices = require('../../services/user-services');

const isEmailValid = body('email')
  .normalizeEmail()
  .isEmail()
  .withMessage('Formato de email inválido')
  .custom(async (email) => {
    const user = await userServices.getUserByEmail(email);
    if (user) {
      throw new BadRequest('Ya existe un usuario con ese email');
    }
  });

const isPasswordValid = body('password')
  .isStrongPassword()
  .withMessage(
    'La contraseña debe tener al menos: 8 caracteres, una letra mayúscula, una mínuscula, un número, un símbolo',
  )
  .isLength({ max: 32 })
  .withMessage('La contraseña no puede tener más de 32 caracteres');

module.exports = {
  isEmailValid,
  isPasswordValid,
};
