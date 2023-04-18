const router = require("express").Router();
const { auth } = require("../controllers/token.controller");
const videoController = require("../controllers/videoUpload.controller");
const upload = require("express-fileupload");

router.post("/", upload(), videoController.uploadVideo);
// router.post("/try", videoController.splitVideo);

module.exports = router;
