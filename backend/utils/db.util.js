const mongoose = require("mongoose");
const { user } = require("../models/user.model");
// const DB_URL = "mongodb+srv://desha:10203040@cluster0.oin2mwv.mongodb.net/?retryWrites=true&w=majority";
const DB_URL = "mongodb://127.0.0.1:27017/Grad"

exports.dbConnect=async()=>{
    await mongoose.connect(DB_URL)
    console.log("DB Connected")
}

exports.dbDisconnect=async()=>{
    await mongoose.disconnect()
    console.log("DB Disconnect")
}

exports.checkData=async(model,key,value)=>{
        if( await model.findOne({email:value}).exec()===null)
        return true
}