const express = require("express");
require("dotenv").config();
const bp = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const apiErrorHandler = require("./errorHandler/apiErrorHandler");

const app = express();

//DB
const dbConnect = require("./utils/db.util");
dbConnect.dbConnect();

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
  console.log("Mode :" + process.env.NODE_ENV);
} else {
  app.use(morgan("tiny"));
  console.log("Mode :" + process.env.NODE_ENV);
}
//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "assets")));

// Mount Routes
const signupRouter = require("./routers/signup.router");
const loginRouter = require("./routers/login.router");
const videoUpload = require("./routers/videoUpload.router");
const profileRouter = require("./routers/profile.router");
const videosRouter = require("./routers/videos.router");
const generateRouter = require("./routers/generate.router");

//Routes
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/upload", videoUpload);
app.use("/profile", profileRouter);
app.use("/videos", videosRouter);
app.use("/upload", videoUpload);
app.use("/generate", generateRouter);
app.use((req,res,next) => {
  res.status(404).send("Error 404 Not Found");
});

const PORT = process.env.PORT;

//Error
app.use(apiErrorHandler);

app.listen(PORT, () => {
  console.log("App Running on Port " + PORT);
});
