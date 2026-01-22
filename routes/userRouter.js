const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const messageController = require('../controllers/messageController.js');

router.get('/', messageController.getPosts);
router.get('/index', (req, res) => {
	res.render('index');
});
router.get('/list', userController.getUsersList);
router.get('/admin', userController.getAdminPage);
router.get('/logout', (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}

		res.redirect('/');
	});
});
router.get('/:id/update', userController.userUpdateGet);
router.post(
	'/:id/update',
	userController.validateUserUpdate,
	userController.userUpdatePost,
);
router.post('/admin', userController.postAdminPage);
router.post('/:id/delete', userController.deleteUser);

module.exports = router;
