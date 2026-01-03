const bcrypt = require('bcryptjs');
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

require('dotenv').config();

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/', (req, res) => {
	res.render('index');
});

app.use('/signup', signupRoute);

app.listen(process.env.PORT, () => {
	console.log(`port listening on port ${process.env.PORT}`);
});
