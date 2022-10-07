const express = require('express');
const characterControllers = require('../controllers/character-controllers');
const validationHandler = require('../middlewares/validation-handler');
const {
  isCharacterIdValid,
} = require('../middlewares/validations/character-validations');

const router = express.Router();

router
  .route('/')
  .get(characterControllers.getCharacterList)
  .post(characterControllers.createCharacter);
router
  .route('/:characterId')
  .get(
    [isCharacterIdValid, validationHandler],
    characterControllers.getCharacterDetail,
  )
  .put(
    [isCharacterIdValid, validationHandler],
    characterControllers.updateCharacter,
  )
  .delete(
    [isCharacterIdValid, validationHandler],
    characterControllers.deleteCharacterById,
  );

module.exports = router;
