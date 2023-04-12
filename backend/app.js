const express = require("express");
const signupRouter = require("./routers/signup.router");
const signupController = require("./controllers/signup.controller");
const loginRouter = require("./routers/login.router");
const bp = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cors());

app.use("/signup", signupRouter);
app.use("/signin", loginRouter);

app.listen(8080, () => {
  console.log("Port 8080");
});
