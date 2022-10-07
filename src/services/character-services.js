const { Op } = require('sequelize');
const { Character } = require('../models');

const createCharacter = async ({
  imageUrl,
  name,
  age,
  weight,
  story,
  moviesId,
}) => {
  const newCharacter = await Character.create({
    imageUrl,
    name,
    age,
    weight,
    story,
  });
  await newCharacter.addMovie(moviesId);
  return newCharacter;
};

const getCharacterList = async ({ name, age, movies }) => {
  const queryObj = {};
  const moviesQueryObj = {};

  if (name) {
    queryObj.name = { [Op.iLike]: `%${name}%` };
  }
  if (age) {
    queryObj.age = { [Op.eq]: age };
  }
  if (movies) {
    moviesQueryObj.movieId = { [Op.eq]: movies };
  }

  const characters = await Character.findAll({
    where: queryObj,
    attributes: ['characterId', 'name', 'imageUrl'],
    include: {
      association: 'movies',
      where: moviesQueryObj,
      attributes: [],
      through: { attributes: [] },
    },
  });
  return characters;
};

const getCharacterDetail = async (characterId) => {
  const character = await Character.findByPk(characterId, {
    include: {
      association: 'movies',
      attributes: ['title', 'imageUrl'],
      through: { attributes: [] },
    },
  });
  return character;
};

const deleteCharacterById = async (characterId) => {
  const result = await Character.destroy({
    where: { characterId },
  });
  return result;
};

const updateCharacter = async ({
  characterId,
  imageUrl,
  name,
  age,
  weight,
  story,
  moviesId,
}) => {
  const character = await Character.findByPk(characterId);
  await character.update({ imageUrl, name, age, weight, story });
  await character.setMovies(moviesId);
};

module.exports = {
  createCharacter,
  getCharacterList,
  getCharacterDetail,
  deleteCharacterById,
  updateCharacter,
};
