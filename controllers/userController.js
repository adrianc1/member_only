const db = require('../db/queries.js');

const createUserGet = async (req, res, next) => {
	res.render('signup');
};
const createUserPost = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const user = await db.createUser(firstName, lastName, email, password);
	console.log(`${user.first_name} ${user.last_name} user created!`);
	res.redirect('/');
};

module.exports = {
	createUserPost,
	createUserGet,
};
