const BadRequest = require('../errors/bad-request');
const characterServices = require('../services/character-services');

const createCharacter = async (req, res, next) => {
  const { imageUrl, name, age, weight, story, moviesId } = req.body;
  try {
    const newCharacter = await characterServices.createCharacter({
      imageUrl,
      name,
      age,
      weight,
      story,
      moviesId,
    });
    const newCharacterDetail = await characterServices.getCharacterDetail(
      newCharacter.characterId,
    );
    res.status(201).json(newCharacterDetail);
  } catch (error) {
    next(error);
  }
};

const getCharacterList = async (req, res, next) => {
  const { name, age, movies } = req.query;
  try {
    const characters = await characterServices.getCharacterList({
      name,
      age: parseInt(age, 10),
      movies: parseInt(movies, 10),
    });
    res.status(200).json(characters);
  } catch (error) {
    next(error);
  }
};

const getCharacterDetail = async (req, res, next) => {
  const { characterId } = req.params;
  try {
    const character = await characterServices.getCharacterDetail(characterId);
    if (!character) {
      throw new BadRequest('El ID no corresponde a ningún personaje');
    }
    res.status(200).json(character);
  } catch (error) {
    next(error);
  }
};

const deleteCharacterById = async (req, res, next) => {
  const { characterId } = req.params;
  try {
    const result = await characterServices.deleteCharacterById(characterId);
    if (!result) {
      throw new BadRequest('El ID no corresponde a ningún personaje');
    }
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
};

const updateCharacter = async (req, res, next) => {
  const { characterId } = req.params;
  const { imageUrl, name, age, weight, story, moviesId } = req.body;
  try {
    await characterServices.updateCharacter({
      characterId,
      imageUrl,
      name,
      age,
      weight,
      story,
      moviesId,
    });
    const characterUpdatedDetail = await characterServices.getCharacterDetail(
      characterId,
    );
    res.status(201).json(characterUpdatedDetail);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCharacter,
  getCharacterList,
  getCharacterDetail,
  deleteCharacterById,
  updateCharacter,
};
