const apiError = require("../errorHandler/apiError");
const user = require("../models/user.model");
const videoModel = require("../models/video.model");
const bcrypt = require("bcrypt");

exports.getVideosById = (req, res, next) => {
  try {
    videoModel.find({ owner: req.user._id }).then((videos) => {
      res.send(videos);
    });
  } catch (error) {
    next(apiError.er(404, "Profile Videos Error"));
  }
};

exports.getData = (req, res, next) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    next(apiError.er(404, "User Data Error"));
  }
};

exports.addToFav = async (req, res, next) => {
  try {
    await user.findByIdAndUpdate(
      req.user._id,
      {
        $push: { favVideos: req.body.videoId },
      },
      { new: true }
    );
    res
      .status(200)
      .send(`Added ${req.body.videoId} to User ${req.user._id} Fav List`);
  } catch (error) {
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
    // console.error(error);
    next(apiError.er(404, "Error"));
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
    // console.error(error);
    next(apiError.er(400, "Error on Editing"));
  }
};
