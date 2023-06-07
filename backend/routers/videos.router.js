const {
  getAllVideos,
  getUserVideos,
} = require("../controllers/videos.controller");

const router = require("express").Router();

router.get("/all", getAllVideos);
router.get("/user/:id", getUserVideos);

module.exports = router;
