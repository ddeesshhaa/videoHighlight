const loginController = require("../controllers/login.controller");
const bp = require("body-parser").urlencoded({ extended: true });

const router = require("express").Router();

router.post("/", loginController.login);

module.exports = router;
