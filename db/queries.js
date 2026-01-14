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
	return rows[0];
};

const updateUserDB = async (first_name, last_name, email, username, id) => {
	console.log('updating user');

	const user = await pool.query(
		`UPDATE users
	SET first_name = $1,
	last_name = $2,
	email = $3,
	username = $4
	WHERE id = $5`,
		[first_name, last_name, email, username, id]
	);
	return user;
};

const deleteUser = async (id) => {
	const { rows } = await pool.query('DELETE FROM users WHERE id=$1', [id]);
	return rows;
};

module.exports = {
	createUser,
	getUsersList,
	deleteUser,
	getUserByUsername,
	getUserById,
	updateUserDB,
};
