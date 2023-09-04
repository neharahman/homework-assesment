const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const teacherSchema= new Schema({
    name:{
        type:String
    },
    mobile:{
        type:Number,
        unique:true
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    address:{
        type:String
    },
    password:{
        type:String
    },
    degree:{
        type:String
    }

})

const teacherModel = mongoose.model('teacher',teacherSchema)
module.exports = teacherModel