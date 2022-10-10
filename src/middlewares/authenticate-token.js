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
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { userId: decode.userId, email: decode.email };
      next();
    } catch (error) {
      throw new Forbidden();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateToken;
