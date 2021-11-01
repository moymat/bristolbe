const express = require("express");
const router = express.Router();
const { userController } = require("../../controllers");
const { isUserAuthz } = require("../../auth");

router.get("/users", userController.getAllUsers);

router.get("/users/:userId", userController.getUser);
router.patch("/users/:userId", isUserAuthz, userController.patchUser);
router.delete("/users/:userId", isUserAuthz, userController.deleteUser);

router.get(
	"/users/:userId/bristols",
	isUserAuthz,
	userController.getUsersBristols
);

//router.use("/bristols", bristolController);

module.exports = router;
