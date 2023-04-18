const router = require("express").Router();
const generateController = require("../controllers/generate.controller");
const { auth } = require("../controllers/token.controller");

router.post("/new", auth, generateController.generateVideo);

module.exports = router;
