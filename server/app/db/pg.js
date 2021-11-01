const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });
const { Pool } = require("pg");

const pool = new Pool({
	user:
		process.env.NODE_ENV === "production"
			? process.env.PGUSER
			: process.env.PG_USER,
	ssl: {
		rejectUnauthorized: false,
	},
});

module.exports = {
	query: (text, params) => pool.query(text, params),
};
