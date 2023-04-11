const express = require("express")
const signupRouter = require("./routers/signup.router")
const signupController = require("./controllers/signup.controller")


const app = express()

app.post("/signup",signupController.addUser)

app.listen(3000,()=>{
    console.log("Port 3000")
})