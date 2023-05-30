const router = require("express").Router();
const signupController = require("../controllers/signup.controller");
const { auth } = require("../controllers/token.controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), signupController.addUser);

module.exports = router;
