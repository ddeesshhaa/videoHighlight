const { splitVideo } = require("./splitVideo");
const { clipToJpg } = require("./clipToJpg");
const { getVideoName } = require("./getVideoName");
const { jpgToJson } = require("./jpgToJson");
const { runModel } = require("./runModel");
const { merge } = require("./merge");
const path = require("path");

const fs = require("fs");

const { promisify } = require("util");
const copyFile = promisify(fs.copyFile);

// const mkdir = promisify(fs.mkdir);

exports.callingFunctions = async (videoName, ext, tempDir, highlightPath) => {
  return new Promise((res, rej) => {
    splitVideo(videoName, ext, tempDir)
      .then((video) => {
        console.log("1- Creating Clips Done");
        clipToJpg(video.videoName, video.tempDir, video.ext)
          .then((video) => {
            console.log("2- Clips to JPG Done");
            getVideoName(video.vName, video.tempPath)
              .then((video) => {
                console.log("3- Making Video Names Done");
                jpgToJson(video.videoName, video.tempPath)
                  .then((video) => {
                    console.log("4- Json Created Successfully");
                    runModel(video.tempPath)
                      .then((video) => {
                        console.log("5- Model Done ");
                        merge(video, ext)
                          .then((video) => {
                            console.log("6- Merge Done , Path: " + video);

                            // mkdir(path.join(tempDir, "result")),
                            copyFile(
                              path.join(video, "highlighted." + ext),
                              path.join(highlightPath, "highlighted." + ext)
                            );
                            res();
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
  });
};