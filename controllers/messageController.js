const bcrypt = require('bcryptjs');
const db = require('../db/queries.js');
const { getLoginPage } = require('./userController.js');

const postMessageGet = async (req, res) => {
	if (req.user) {
		res.render('message');
	} else {
		res.render('login');
	}
};

const postMessagePost = async (req, res) => {
	console.log('user', req.user);
	console.log('body', req.body);
	await db.createMessage(req.user.id, req.body.title, req.body.body);
	const users = await db.getUsersList();
	res.render('list', { title: 'Post Successful', users });
};

module.exports = {
	postMessageGet,
	postMessagePost,
};
