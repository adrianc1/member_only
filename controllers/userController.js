const bcrypt = require('bcryptjs');
const db = require('../db/queries.js');
const { body, validationResult, matchedData } = require('express-validator');

const alphaErr = 'Must only contain letters.';
const lengthErr = 'must be between 2 and 10 characters';
const secretPhrase = 'yellow';

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
	body('username')
		.isLength({ min: 1 })
		.withMessage(`username must at least contain 1 character `),
	,
	body('password')
		.isLength({ min: 4 })
		.withMessage('password must be at least 8 characters'),
	body('confirmPassword')
		.custom((value, { req }) => {
			return value === req.body.password;
		})
		.withMessage('passwords do not match!'),
];

const validateUserUpdate = [
	body('firstName').optional().trim().isAlpha().isLength({ min: 2, max: 10 }),

	body('lastName').optional().trim().isAlpha().isLength({ min: 2, max: 10 }),

	body('email').optional().trim().isEmail(),

	body('username').optional().isLength({ min: 1 }),
];
const getUsersList = async (req, res, next) => {
	res.render('list', {
		title: 'Users List',
		users: await db.getUsersList(),
	});
};

const createUserGet = async (req, res, next) => {
	res.render('signup');
};

const createUserPost = async (req, res) => {
	const errors = validationResult(req);
	const { firstName, lastName, email, username } = matchedData(req);

	if (!errors.isEmpty()) {
		return res
			.status(400)
			.render('signup', { errors: errors.array(), firstName, lastName, email });
	}
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	const user = await db.createUser(
		firstName,
		lastName,
		email,
		username,
		hashedPassword,
	);
	console.log(`${user.first_name} ${user.last_name} user created!`);
	res.redirect('/');
};

const checkSecretPhrase = (req, res) => {
	const { secret } = req.body;

	if (typeof secret !== 'string') {
		return res.status(400).render('club', { error: 'Invalid input' });
	}

	if (secret !== secretPhrase) {
		console.log(secret, secretPhrase);
		return res.status(401).render('club', { error: 'Wrong !' });
	}
	res.send('Welcome!');
};

const checkSecretPhraseGet = async (req, res) => {
	res.render('club', { logged_user: req.user?.username });
};

const getLoginPage = (req, res) => {
	if (!req.user) {
		res.render('login');
		return;
	}
	res.render('club', { logged_user: req.user?.username });
};

const userUpdateGet = async (req, res) => {
	const user = await db.getUserById(req.params.id);
	res.render('updateUser', { user: user });
};

const userUpdatePost = async (req, res) => {
	const errors = validationResult(req);
	const id = parseInt(req.params.id);
	console.log('id is', id);
	const { firstName, lastName, email, username } = matchedData(req);

	if (!errors.isEmpty()) {
		return res.status(400).render('signup', {
			errors: errors.array(),
			firstName,
			lastName,
			email,
			username,
		});
	}

	console.log({
		firstName,
		lastName,
		email,
		username,
		id,
	});

	const user = await db.updateUserDB(firstName, lastName, email, username, id);
	res.redirect('/list');
};

const deleteUser = async (req, res) => {
	const id = req.params.id;
	console.log(id);
	const deletedUser = await db.deleteUser(id);
	res.redirect('/list');
};

module.exports = {
	createUserPost,
	createUserGet,
	validateUser,
	getUsersList,
	checkSecretPhrase,
	checkSecretPhraseGet,
	getLoginPage,
	userUpdateGet,
	userUpdatePost,
	validateUserUpdate,
	deleteUser,
};
