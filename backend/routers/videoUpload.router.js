const router = require("express").Router();
const multer = require("multer");
const { auth } = require("../controllers/token.controller");
const videoController = require("../controllers/videoUpload.controller");
const upload = require("express-fileupload");
const { generateVideo } = require("../controllers/generate.controller");
// const upload = multer({ dest: "assets\\uploads\\videos" });

router.post("/", auth, upload(), videoController.uploadVideo, generateVideo);
// router.post("/", auth, upload.single("video"), videoController.uploadVideo);

// router.post("/try", videoController.splitVideo);

module.exports = router;
