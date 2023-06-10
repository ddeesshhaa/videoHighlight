const { default: mongoose } = require("mongoose");
const user = require("./user.model");

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: user },
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
