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
	await db.createMessage(req.user.id, req.body.title, req.body.body);
	const users = await db.getUsersList();
	res.render('list', { title: 'Post Successful', users });
};

const getPosts = async (req, res) => {
	const posts = await db.joinPosts();
	console.log(req.user, 'this is the current user');
	const user = req.user;
	res.render('home', { posts, user });
};

module.exports = {
	postMessageGet,
	postMessagePost,
	getPosts,
};
