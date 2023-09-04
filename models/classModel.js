const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const classSchema= new Schema({
    name:{
        type:String
    },
    timing:{
        type:String
    }
})

const classModel = mongoose.model('class',classSchema)
module.exports = classModel