const express = require("express");
const { isAuth } = require("../../auth");
const router = express.Router();
const { authController } = require("../../controllers");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/reset-password", authController.postResetPassword);
router.patch("/reset-password", authController.patchResetPassword);
router.get("/check-reset-code/:code", authController.checkResetCode);

router.get("/is_auth", isAuth, authController.isAuth);
router.post("/verify", isAuth, authController.verifyCode);
router.get("/verify/resend", isAuth, authController.resendCode);

router.get("/logout", authController.logout);

module.exports = router;
