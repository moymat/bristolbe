const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
	res.json({ status: "ok" });
});

module.exports = router;
