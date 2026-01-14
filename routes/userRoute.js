const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/', (req, res) => {
	res.render('index');
});
router.get('/:id/update', userController.userUpdateGet);
router.post(
	'/:id/update',
	userController.validateUserUpdate,
	userController.userUpdatePost
);
router.post('/:id/delete', userController.deleteUser);

module.exports = router;
