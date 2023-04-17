const express = require("express");
const dotenv = require("dotenv").config();
const bp = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

//DB
const dbConnect = require("./utils/db.util");
dbConnect.dbConnect();

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
  console.log("Mode :" + process.env.NODE_ENV);
}
//Middleware
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "assets")));

// Mount Routes
const signupRouter = require("./routers/signup.router");
const loginRouter = require("./routers/login.router");
const videoUpload = require("./routers/videoUpload.router");
const tokenRoute = require("./routers/token.route");

//Routes
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/generate", videoUpload);
app.use("/token", tokenRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("App Running on Port " + PORT);
});
