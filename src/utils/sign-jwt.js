const jwt = require('jsonwebtoken');

const signJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

module.exports = signJWT;
