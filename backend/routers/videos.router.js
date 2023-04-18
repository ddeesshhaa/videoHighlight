const { getAllVideos } = require("../controllers/videos.controller");

const router = require("express").Router();

router.get("/all", getAllVideos);

module.exports = router;
