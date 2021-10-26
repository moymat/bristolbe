const express = require("express");
const router = express.Router();
const apiRouter = require("./api");
const authRouter = require("./auth");

router.use("/auth", authRouter);

router.use("/api", apiRouter);

module.exports = router;
