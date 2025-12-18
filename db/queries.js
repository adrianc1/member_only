const pool = require('./pool');

const createUser = async (firstName, lastName, email, password) => {
	const { rows } = await pool.query(
		`INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)
		RETURNING *`,
		[firstName, lastName, email, password]
	);
	return rows[0];
};

module.exports = {
	createUser,
};
