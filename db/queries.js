const pool = require('./pool');

const createUser = async (firstName, lastName, email, password) => {
	const { rows } = await pool.query(
		`INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)
		RETURNING *`,
		[firstName, lastName, email, password]
	);
	return rows[0];
};

const getUsersList = async () => {
	const { rows } = await pool.query(`
		SELECT * FROM users`);
	return rows;
};

const deleteUser = async () => {};

module.exports = {
	createUser,
	getUsersList,
	deleteUser,
};
