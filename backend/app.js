const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const signupRouter = require("./routers/signup.router");
const loginRouter = require("./routers/login.router");
const bp = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const app = express();
dotenv.config({ path: ".env" });
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
  console.log("Mode :" + process.env.NODE_ENV);
}
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cors());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Port " + PORT);
});
