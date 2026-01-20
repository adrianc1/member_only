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

const postMessagePost = async (req, res) => {};

module.exports = {
	postMessageGet,
	postMessagePost,
};
