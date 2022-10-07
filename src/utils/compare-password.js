const bcrypt = require('bcryptjs');

const comparePassword = (password, hashedPassword) => {
  const match = bcrypt.compareSync(password, hashedPassword);
  return match;
};

module.exports = comparePassword;
