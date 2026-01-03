const db = require('../db/queries.js');
const { body, validationResult, matchedData } = require('express-validator');

const alphaErr = 'Must only contain letters.';
const lengthErr = 'must be between 2 and 10 characters';

const validateUser = [
	body('firstName')
		.trim()
		.isAlpha()
		.withMessage(`First name ${alphaErr}`)
		.isLength({ min: 2, max: 10 })
		.withMessage(`First name ${lengthErr}`),
	body('lastName')
		.trim()
		.isAlpha()
		.withMessage(`Last name ${alphaErr}`)
		.isLength({ min: 2, max: 10 })
		.withMessage(`Last name ${lengthErr}`),
	body('email')
		.trim()
		.isEmail()
		.withMessage(`Must enter a valid email`)
		.isLength({ min: 1 })
		.withMessage(`Email must at least contain 1 character `),
	body('password')
		.isLength({ min: 8 })
		.withMessage('password must be at least 8 characters'),
	body('confirmPassword')
		.custom((value, { req }) => {
			return value === req.body.password;
		})
		.withMessage('passwords do not match!'),
];

const createUserGet = async (req, res, next) => {
	res.render('signup');
};
const createUserPost = async (req, res) => {
	const errors = validationResult(req);
	const { firstName, lastName, email, password, confirmPassword } = req.body;
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.render('signup', { errors: errors.array(), firstName, lastName, email });
	}

	const user = await db.createUser(firstName, lastName, email, password);
	console.log(`${user.first_name} ${user.last_name} user created!`);
	res.redirect('/');
};

module.exports = {
	createUserPost,
	createUserGet,
	validateUser,
};
