const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/create', userController.createUserGet);
router.post(
	'/create',
	userController.validateUser,
	userController.createUserPost
);

router.get('/secret', userController.checkSecretPhraseGet);

router.post('/secret', userController.checkSecretPhrase);

module.exports = router;
