const router = require("express").Router();
const videoController = require("../controllers/videoUpload.controller");
const upload = require("express-fileupload");

router.post("/", upload(), videoController.uploadVideo);
// router.post("/try", videoController.splitVideo);
router.post("/new", videoController.generateVideo);

module.exports = router;
