const { default: mongoose } = require("mongoose");
const apiError = require("../errorHandler/apiError");
const user = require("../models/user.model");
const videoModel = require("../models/video.model");
const bcrypt = require("bcrypt");
const logger = require("../errorHandler/logger");

exports.getVideosById = async (req, res, next) => {
  try {
    user
      .findById(req.user._id)
      .select("doneVideos")
      .exec()
      .then((userData) => {
        const doneVideoIds = userData.doneVideos; // Array of video IDs
        videoModel
          .find({ _id: { $in: doneVideoIds } })
          .exec()
          .then((videos) => {
            res.status(200).send(videos);
          });
      });
  } catch (error) {
    logger.error(
      `User ${req.user._id} - Profile Controller - getVideosById - Error ${error}`
    );
    next(apiError.er(404, "Profile Videos Error"));
  }
};

exports.getFavVideosById = async (req, res, next) => {
  try {
    user
      .findById(req.user._id)
      .select("favVideos")
      .exec()
      .then((userData) => {
        let favVideosIds = userData.favVideos;
        videoModel
          .find({ _id: { $in: favVideosIds } })
          .exec()
          .then((videos) => {
            res.status(200).send(videos);
          });
      });
  } catch (error) {
    logger.error(
      `User ${req.user._id} - Profile Controller - getFavVideosById - Error ${error}`
    );
    next(apiError.er(404, "Profile Videos Error"));
  }
};

exports.getData = async (req, res, next) => {
  try {
    let userData = await user
      .findById(req.user._id)
      .select("doneVideos favVideos")
      .exec();

    let favVideosIds = userData.favVideos;
    let doneVideosIds = userData.doneVideos;

    var favVideos = await videoModel
      .find({ _id: { $in: favVideosIds } })
      .exec();

    var doneVideos = await videoModel
      .find({ _id: { $in: doneVideosIds } })
      .exec();

    res.send({ userData: req.user, fav: favVideos, done: doneVideos });
  } catch (error) {
    logger.error(
      `User ${req.user._id} - Profile Controller - getData - Error ${error}`
    );
    next(apiError.er(404, "User Data Error"));
  }
};

exports.addToFav = async (req, res, next) => {
  try {
    user.findOne(req.user._id).then((x) => {
      if (x.favVideos.includes(req.body.videoId)) {
        return res.status(204).send("Already fav");
      }
      user
        .findByIdAndUpdate(
          req.user._id,
          {
            $push: { favVideos: req.body.videoId },
          },
          { new: true }
        )
        .then(res.status(200).send("Done"));
    });
  } catch (error) {
    logger.error(
      `User ${req.user._id} - Profile Controller - addToFav - Error ${error}`
    );
    next(apiError.er(404, "Error"));
  }
};

exports.removeFromFav = async (req, res, next) => {
  try {
    await user.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { favVideos: req.body.videoId },
      },
      { new: true }
    );
    res.status(200).send(req.user._id);
  } catch (error) {
    logger.error(
      `User ${req.user._id} - Profile Controller - removeFromFav - Error ${error}`
    );

    next(apiError.er(404, "Error"));
  }
};

exports.removeFromHighlight = async (req, res, next) => {
  try {
    await user.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { doneVideos: req.body.videoId },
      },
      { new: true }
    );
    res.status(200).send("Deleted");
  } catch (error) {
    logger.error(
      `User ${req.user._id} - Profile Controller - removeFromFav - Error ${error}`
    );
    next(apiError.er(404, "Error"));
  }
};

exports.uploadProfilePic = async (req, res) => {
  try {
    pict = {
      name: req.file.originalname,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    };
    await user.findByIdAndUpdate(
      req.user._id,
      {
        pic: pict,
      },
      { new: true }
    );

    res
      .status(200)
      .send(
        "data:" +
          pict.image.contentType +
          ";base64," +
          pict.image.data.toString("base64")
      );
  } catch (error) {
    logger.error(
      `User ${req.user._id} - Profile Controller - uploadProfilePic - Error ${error}`
    );
    next(apiError.er(404, "Error"));
  }
};

exports.editProfile = async (req, res, next) => {
  try {
    var pict;
    if (await bcrypt.compare(req.body.oldPassword, req.user.password)) {
      user.find({ email: req.body.email }).then((users) => {
        if (req.file !== undefined) {
          pict = {
            name: req.file.originalname,
            image: {
              data: req.file.buffer,
              contentType: req.file.mimetype,
            },
          };
        } else {
          pict = req.user.pic;
        }

        if (users.length === 0) {
          let inputPass = req.body.newPassword || req.body.oldPassword;
          const hash = bcrypt.hashSync(inputPass, bcrypt.genSaltSync(10));
          user
            .findByIdAndUpdate(
              req.user._id,
              {
                firstName: req.body.firstName || req.user.firstName,
                lastName: req.body.lastName || req.user.lastName,
                email: req.body.email || req.user.email,
                password: hash,
                pic: pict,
              },
              { new: true }
            )
            .then(() => {
              res.status(200).send("Edited");
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          next(apiError.er(400, "Email is already exist"));
          // res.status(400).send("Email is already exist");
        }
      });
    } else {
      next(apiError.er(400, "Wrong Password"));

      // res.status(400).send("Wrong Password");
    }
  } catch (error) {
    logger.error(
      `User ${req.user._id} - Profile Controller - editProfile - Error ${error}`
    );
    next(apiError.er(400, "Error on Editing"));
  }
};
