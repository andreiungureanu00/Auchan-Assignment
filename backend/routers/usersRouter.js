const express = require("express");
const userController = require("../controllers/usersController");
const { validateUser } = require("../middlewares/verifyUser");
const { authenticate } = require("../middlewares/authentication");

const router = express.Router();

router.post("/register", validateUser, userController.register);
router.post("/login", userController.login);
router.get("/", authenticate, userController.getUsers);
router.get("/:id", authenticate, userController.getUser);
router.get("/check/:token", authenticate, userController.checkToken);

module.exports = router;
