const user = require("../models/user.model");
const videoModel = require("../models/video.model");
const bcrypt = require("bcrypt");
exports.getVideosById = (req, res) => {
  videoModel
    .find({ owner: req.user._id })
    .then((videos) => {
      res.send(videos);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getData = (req, res) => {
  res.status(200).send(req.user);
};

exports.addToFav = async (req, res) => {
  if (req.user !== undefined) {
    await user.findByIdAndUpdate(req.user._id, {
      $push: { favVideos: req.body.videoId },
    });
    res.status(200).send(req.user._id);
  } else {
    res.status(401).send(" The user is not authorized");
  }
};

exports.removeFromFav = async (req, res) => {
  if (req.user !== undefined) {
    await user.findByIdAndUpdate(req.user._id, {
      $pull: { favVideos: req.body.videoId },
    });
    res.status(200).send(req.user._id);
  } else {
    res.status(401).send(" The user is not authorized");
  }
};

exports.uploadProfilePic = async (req, res) => {
  pict = {
    name: req.file.originalname,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  };
  await user.findByIdAndUpdate(req.user._id, {
    pic: pict,
  });

  res
    .status(200)
    .send(
      "data:" +
        pict.image.contentType +
        ";base64," +
        pict.image.data.toString("base64")
    );
};

exports.editProfile = async (req, res) => {
  if (await bcrypt.compare(req.body.oldPassword, req.user.password)) {
    user
      .find({ email: req.body.email })
      .then((users) => {
        if (users.length === 0) {
          let inputPass = req.body.newPassword || req.body.oldPassword;
          const hash = bcrypt.hashSync(inputPass, bcrypt.genSaltSync(10));
          user
            .findByIdAndUpdate(req.user._id, {
              firstName: req.body.firstName || req.user.firstName,
              lastName: req.body.lastName || req.user.lastName,
              email: req.body.email || req.user.email,
              password: hash,
            })
            .then(() => {
              res.status(200).send("Edited");
            });
        } else {
          res.status(400).send("Email is already exist");
        }
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.status(400).send("Wrong Password");
  }
};
