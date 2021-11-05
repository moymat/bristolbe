const express = require("express");
const router = express.Router();
const { userController, bristolController } = require("../../controllers");
const { isUserAuthz } = require("../../auth");

router.get("/users", userController.getAllUsers);

router.get("/users/:userId", userController.getUser);
router.patch("/users/:userId/info", isUserAuthz, userController.patchUserInfo);
router.patch(
	"/users/:userId/email",
	isUserAuthz,
	userController.patchUserEmail
);
router.patch(
	"/users/:userId/password",
	isUserAuthz,
	userController.patchUserPassword
);
router.delete("/users/:userId", isUserAuthz, userController.deleteUser);

router.get(
	"/users/:userId/bristols",
	isUserAuthz,
	userController.getUsersBristols
);

router.post("/bristols", bristolController.createBristol);
router.post("/bristols/move", bristolController.moveBristol);
router.get("/bristols/:bristolId", bristolController.getBristol);
router.patch("/bristols/:bristolId", bristolController.patchBristol);
router.get("/bristols/:bristolId/roles", bristolController.getBristolRoles);
router.post("/bristols/:bristolId/roles", bristolController.manageRoles);

//router.use("/bristols", bristolController);

module.exports = router;
