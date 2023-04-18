const loginController = require("../controllers/login.controller");
const { auth } = require("../controllers/token.controller");

const router = require("express").Router();

router.get("/check", auth, loginController.check);
router.post("/", loginController.login);

module.exports = router;
