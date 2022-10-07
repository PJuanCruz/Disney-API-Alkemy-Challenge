const jwt = require('jsonwebtoken');
const Forbidden = require('../errors/forbidden');
const Unauthorized = require('../errors/unauthorized');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Unauthorized();
    }
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      throw new Forbidden();
    }
    req.user = { userId: decode.userId, email: decode.email };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateToken;
