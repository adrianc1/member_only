const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const passport = require('passport');
router.get('/', userController.getLoginPage);
router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/signup/create',
	})
);

module.exports = router;
