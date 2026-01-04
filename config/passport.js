const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const db = require('../db/queries');

module.exports = function (passport) {
	passport.use(
		new LocalStrategy(async function (username, password, done) {
			try {
				const user = await db.getUserByUsername(username);

				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}

				// Check password (assuming you have a function for this)
				const isValid = await db.comparePassword(password, user.password);

				if (!isValid) {
					return done(null, false, { message: 'Incorrect password.' });
				}

				return done(null, user);
			} catch (err) {
				return done(err);
			}
		})
	);
};
