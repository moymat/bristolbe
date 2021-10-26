const express = require("express");
const { isAuth } = require("../auth");
const router = express.Router();
const apiRouter = require("./api");
const authRouter = require("./auth");

router.use("/auth", authRouter);
router.use("/api", apiRouter);
router.get("/protected", isAuth, (req, res) => {
	res.json({ status: "success" });
});

module.exports = router;
