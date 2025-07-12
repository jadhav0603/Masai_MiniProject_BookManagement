const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        requried:true
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel