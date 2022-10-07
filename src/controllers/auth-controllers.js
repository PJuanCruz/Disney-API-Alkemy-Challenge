const Unauthorized = require('../errors/unauthorized');
const userServices = require('../services/user-services');
const comparePassword = require('../utils/compare-password');
const hash = require('../utils/hash');
const sendRegisterMail = require('../utils/send-register-mail');
const signJWT = require('../utils/sign-jwt');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = hash(password);
    const newUser = await userServices.createUser({
      email,
      password: hashedPassword,
    });
    await sendRegisterMail(newUser.email);
    newUser.password = undefined; // hide password
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userServices.getUserByEmail(email);
    if (!user) throw new Unauthorized('Email o contraseña incorrectos');
    const match = comparePassword(password, user.password);
    if (!match) throw new Unauthorized('Email o contraseña incorrectos');
    const token = signJWT({ userId: user.userId, email: user.email });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
