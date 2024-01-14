const express = require("express");
const { isAuth } = require("../auth");
const router = express.Router();
const apiRouter = require("./api");
const authRouter = require("./auth");

router.get("/", (_, res) => {
  res.send("OK");
});
router.use("/auth", authRouter);
router.use("/api", isAuth, apiRouter);

module.exports = router;
