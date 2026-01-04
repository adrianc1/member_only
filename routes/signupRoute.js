const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/list', userController.getUsersList);
router.get('/create', userController.createUserGet);
router.post(
	'/create',
	userController.validateUser,
	userController.createUserPost
);

router.get('/secret', userController.checkSecretPhraseGet);

router.post('/secret', userController.checkSecretPhrase);

// router.get('/:id/update', userController.userUpdateGet);
// router.post('/:id/update', userController.userUpdatePost);
// usersRouter.post('/:id/delete', usersController.usersDeletePost);

module.exports = router;
