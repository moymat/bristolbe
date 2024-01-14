const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });
const { Pool } = require("pg");

const options =
  process.env.NODE_ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : { user: process.env.PG_USER };

const pool = new Pool(options);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
