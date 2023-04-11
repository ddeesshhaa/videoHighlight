const user = require("../models/user.model")
const db = require("../utils/db.util")
const users = require("../models/user.model")
const bcrypt = require("bcrypt")
        
exports.addUser = async (req,res)=>{
    await db.dbConnect()
    const hash = bcrypt.hashSync(req.query.password, bcrypt.genSaltSync(10));

    let data = {
        firstName:req.query.firstName,
        lastName:req.query.lastName,
        email:req.query.email,
        password:hash
    }
    if(!await db.checkData(users,"email",req.query.email)===true){
        res.send("Invalid")
    }else{
        await users.create(data)
        res.send("Done")
    }
    db.dbDisconnect()
    
}