const pool = require('./pool');

const createUser = async (firstName, lastName, email, username, password) => {
	const { rows } = await pool.query(
		`INSERT INTO users (first_name, last_name, email, username, password_hash) VALUES ($1, $2, $3, $4, $5)
		RETURNING *`,
		[firstName, lastName, email, username, password]
	);
	return rows[0];
};

const getUsersList = async () => {
	const { rows } = await pool.query(`
		SELECT * FROM users`);
	return rows;
};

const getUserByUsername = async (username) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
		username,
	]);
	return rows[0];
};

const getUserById = async (id) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
	return rows;
};

const deleteUser = async () => {};

module.exports = {
	createUser,
	getUsersList,
	deleteUser,
	getUserByUsername,
	getUserById,
};
