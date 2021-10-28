const express = require("express");
const { isAuth } = require("../../auth");
const router = express.Router();
const { authController } = require("../../controllers");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authController.logout);
router.get("/is_auth", isAuth, authController.isAuth);

module.exports = router;
