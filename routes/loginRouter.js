const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const passport = require('passport');

router.get('/', (req, res) => userController.getLoginPage(req, res));

router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/login/club',
		failureRedirect: '/login',
	})
);
router.get('/club', (req, res) => {
	userController.checkSecretPhraseGet(req, res);
	console.log(`logged in as ${req.user.username}`);
});

module.exports = router;
