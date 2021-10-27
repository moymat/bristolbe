const { Pool } = require("pg");

const pool = new Pool({
	user:
		process.env.NODE_ENV === "development"
			? process.env.PG_USER
			: process.env.PGUSER,
	ssl: {
		rejectUnauthorized: false,
	},
});

module.exports = {
	query: (text, params) => pool.query(text, params),
};
