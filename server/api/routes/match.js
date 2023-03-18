const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();

router.post('/', matchController.createMatch);
router.get('/', matchController.getMatches);
router.put('/:id', matchController.updateMatch);
router.delete('/:id', matchController.deleteMatch);

module.exports = router;
