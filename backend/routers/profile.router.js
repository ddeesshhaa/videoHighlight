const { getVideosById } = require("../controllers/profile.controller");

const router = require("express").Router();

router.route("/getVideos").get(getVideosById);

module.exports = router;
