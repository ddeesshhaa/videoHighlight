const router = require("express").Router();
const generateController = require("../controllers/generate.controller");
const { auth } = require("../controllers/token.controller");

router.post("/new", auth, generateController.generateVideo);
router.post("/cancel", auth, generateController.cancelRequest);

module.exports = router;
