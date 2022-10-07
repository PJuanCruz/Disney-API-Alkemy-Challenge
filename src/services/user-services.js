const { User } = require('../models');

const createUser = async ({ email, password }) => {
  const newUser = await User.create({ email, password });
  return newUser;
};

const getUserByEmail = async (email) => {
  const user = await User.scope('includePassword').findOne({
    where: { email },
  });
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
};
