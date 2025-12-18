const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/', (req, res) => {
	res.render('signup');
});

router.post('/', userController.createUser);

module.exports = router;
