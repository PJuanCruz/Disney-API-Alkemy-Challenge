const express = require('express');
const characterControllers = require('../controllers/character-controllers');
const authenticateToken = require('../middlewares/authenticate-token');
const {
  postCharactersValidations,
  getCharactersValidations,
  deleteCharactersValidations,
  putCharactersValidations,
} = require('../middlewares/validations/character-validations');

const router = express.Router();

router
  .route('/')
  .get([authenticateToken], characterControllers.getCharacterList)
  .post(
    [authenticateToken, ...postCharactersValidations],
    characterControllers.createCharacter,
  );

router
  .route('/:characterId')
  .get(
    [authenticateToken, ...getCharactersValidations],
    characterControllers.getCharacterDetail,
  )
  .put(
    [authenticateToken, ...putCharactersValidations],
    characterControllers.updateCharacter,
  )
  .delete(
    [authenticateToken, ...deleteCharactersValidations],
    characterControllers.deleteCharacterById,
  );

module.exports = router;
