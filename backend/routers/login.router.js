const loginController = require("../controllers/login.controller");
const { auth } = require("../controllers/token.controller");

const router = require("express").Router();

router.post("/", loginController.login);

module.exports = router;
