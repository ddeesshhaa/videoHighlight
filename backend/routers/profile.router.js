const {
  getVideosById,
  getData,
  addToFav,
  removeFromFav,
} = require("../controllers/profile.controller");
const { auth } = require("../controllers/token.controller");

const router = require("express").Router();

router.get("/getVideos", auth, getVideosById);
router.get("/getData", auth, getData);
router.put("/addToFav", auth, addToFav);
router.delete("/removeFromFav", auth, removeFromFav);

module.exports = router;
