const { default: mongoose } = require("mongoose");
const apiError = require("../errorHandler/apiError");
const user = require("../models/user.model");
const videoModel = require("../models/video.model");
const bcrypt = require("bcrypt");

// exports.getVideosById = (req, res, next) => {
//   try {
//     videoModel.find({ owner: req.user._id }).then((videos) => {
//       res.send(videos);
//     });
//   } catch (error) {
//     next(apiError.er(404, "Profile Videos Error"));
//   }
// };
exports.getVideosById = async (req, res, next) => {
  try {
    let userData = await user.findById(req.user._id);

    let videos = [];
    for (let videoIdx of userData.doneVideos) {
      let foundVideo = await videoModel.find({ _id: videoIdx });
      videos.push(...foundVideo);
    }
    res.status(200).send(videos);
  } catch (err) {
    // console.log(err);
    next(apiError.er(404, "Profile Videos Error"));
  }
};

//     userData["doneVideos"].forEach((videoId) => {
//       videoModel.find({ _id: videoId }).then((videos) => {
//         res.status(200).send("videos");
//       });
//     });
//   } catch (error) {
//     next(apiError.er(404, "Profile Videos Error"));
//   }
// };

exports.getFavVideosById = async (req, res, next) => {
  try {
    var videos = [];
    let userData = await user.findById(req.user._id);

    for (let videoId of userData.favVideos) {
      let foundVideos = await videoModel.find({
        _id: videoId,
      });
      videos.push(...foundVideos);
    }
    res.status(200).send(videos);
  } catch (error) {
    next(apiError.er(404, "Profile Videos Error"));
    // console.log(error);
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
