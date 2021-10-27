const express = require("express");
const router = express.Router();
const client = require("../../db/pg");

router.use("/", async (req, res) => {
	const { rows } = await client.query('SELECT * FROM "user"');
	res.json({ rows });
});

module.exports = router;
