const router = require("express").Router()
const signupController = require("../controllers/signup.controller")

router.post("/",signupController.addUser)

module.exports=router