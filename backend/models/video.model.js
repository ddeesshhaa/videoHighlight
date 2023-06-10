const { default: mongoose } = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      id: String,
      firstName: String,
      pic: Object,
    },
    ext: String,
    videoName: String,
    highlightUrl: {
      type: String,
      default: "#",
    },
  },
  { timestamps: true }
);

const videoModel = mongoose.model("video", videoSchema);

module.exports = videoModel;
