const { auth } = require("../controllers/token.controller");

const router = require("express").Router();
router.route("/").get(auth);
module.exports = router;
