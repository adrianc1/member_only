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

module.exports = router;
