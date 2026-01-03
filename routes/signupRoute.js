const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/', (req, res) => {
	res.render('signup');
});

router.get('/create', userController.createUserGet);

router.post(
	'/create',
	userController.validateUser,
	userController.createUserPost
);

module.exports = router;
