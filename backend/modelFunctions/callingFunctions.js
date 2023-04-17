const { splitVideo } = require("./splitVideo");
const { clipToJpg } = require("./clipToJpg");
const { getVideoName } = require("./getVideoName");
const { jpgToJson } = require("./jpgToJson");
const { runModel } = require("./runModel");
const { merge } = require("./merge");

exports.callingFunctions = async (videoName, tempDir) => {
  splitVideo(videoName, tempDir)
    .then((video) => {
      console.log("1- Creating Clips Done");
      clipToJpg(video.videoName, video.tempDir)
        .then((video) => {
          console.log(video.vName, video.tempPath);

          console.log("2- Clips to JPG Done");
          getVideoName(video.vName, video.tempPath)
            .then((video) => {
              console.log("3- Making Video Names Done");
              jpgToJson(video.videoName, video.tempPath)
                .then((video) => {
                  console.log("4- Json Created Successfully");
                  console.log(
                    video.videoName +
                      " Done Successfully on path : " +
                      video.tempPath
                  );
                  runModel(video.tempPath)
                    .then((video) => {
                      console.log(
                        "5- Model Done & results on " + video + "/result"
                      );
                      merge(video)
                        .then((video) => {
                          console.log("Merge Done");
                        })
                        .catch((err) => {
                          console.error(err);
                        });
                    })

                    .catch((err) => {
                      console.error(err);
                    });
                })
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
