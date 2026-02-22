const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });
const { Pool } = require("pg");

function buildConnString() {
  const user = process.env.PGUSER || process.env.PG_USER;
  const password = process.env.PGPASSWORD || process.env.PG_PASSWORD;
  const host = process.env.PGHOST || process.env.PG_HOST || "localhost";
  const port = process.env.PGPORT || process.env.PG_PORT || "5432";
  const db = process.env.PGDATABASE || process.env.PG_DATABASE;

  if (!user || !db) {
    return null;
  }

  const u = encodeURIComponent(user);
  const p = password ? encodeURIComponent(password) : "";
  const auth = password ? `${u}:${p}` : u;

  return `postgresql://${auth}@${host}:${port}/${db}`;
}

const pool = new Pool({ connectionString: buildConnString(), ssl: false });

module.exports = {
  query: (text, params) => pool.query(text, params),
};
