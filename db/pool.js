const { Pool } = require('pg');

module.exports = new Pool({
	connectionString: `postgresql://${USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
});
