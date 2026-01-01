const db = require('../db/queries.js');
const { body, validationResult, matchedData } = require('express-validator');

const alphaErr = 'Must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters';

const validateUser = [
	body('firstName')
		.trim()
		.isAlpha()
		.withMessage(`First name ${alphaErr}`)
		.isLength({ min: 1, max: 10 })
		.withMessage(`First name ${lengthErr}`),
	body('lastName')
		.trim()
		.isAlpha()
		.withMessage(`Last name ${alphaErr}`)
		.isLength({ min: 1, max: 10 })
		.withMessage(`Last name ${lengthErr}`),
];

const createUserGet = async (req, res, next) => {
	res.render('signup');
};
const createUserPost = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).render('signup', { errors: errors.array() });
	}

	const { firstName, lastName, email, password } = req.body;
	const user = await db.createUser(firstName, lastName, email, password);
	console.log(`${user.first_name} ${user.last_name} user created!`);
	res.redirect('/');
};

module.exports = {
	createUserPost,
	createUserGet,
	validateUser,
};
