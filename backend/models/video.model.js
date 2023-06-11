const { default: mongoose } = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
