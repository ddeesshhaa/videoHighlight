const router = require("express").Router();
const signupController = require("../controllers/signup.controller");
const { auth } = require("../controllers/token.controller");

router.get("/check", auth, signupController.check);
router.post("/", signupController.addUser);

module.exports = router;
