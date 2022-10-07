const bcrypt = require('bcryptjs');

const hash = (value) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedValue = bcrypt.hashSync(value, salt);
  return hashedValue;
};

module.exports = hash;
