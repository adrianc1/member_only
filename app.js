const path = require('node:path');
const { Pool } = require('pg');
const express = require('express');
const pg = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db/pool.js');
const signupRoute = require('./routes/signupRoute.js');
const { body, validationResult } = require('express-validator');

require('dotenv').config();

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		store: new pgSession({
			pool: pool,
			tableName: 'session',
		}),
		secret: process.env.COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
	})
);
app.use(passport.initialize());
app.use(passport.session());

const nameValidators = [
	body('firstName')
		.trim()
		.notEmpty()
		.withMessage('First name cannot be empty')
		.isAlpha()
		.withMessage('First name must only contain letters'),

	body('lastName')
		.trim()
		.notEmpty()
		.withMessage('Last name cannot be empty')
		.isAlpha()
		.withMessage('Last name must only contain letters'),
];

const controller = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).render('index', {
			errors: errors.array(),
		});
	}

	res.redirect('/sucess');
};
app.get('/', (req, res) => {
	res.send(`<h1>WELCOME TO THE CLUB</h1>
		<p>Sign up <a href='/signup'> here </a> </p>
		`);
});

app.use('/signup', signupRoute);

app.listen(process.env.PORT, () => {
	console.log(`port listening on port ${process.env.PORT}`);
});
