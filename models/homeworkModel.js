const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const homeworkSchema = new Schema({
    task_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task'
    },
    teacher_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    },
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class',
    },
    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    marks:{
        type:Number,
        default:0
    },
    link:{
        type:String
    },
    checked:{
        type:Boolean,
        default:false
    }
})

const homeworkModel = mongoose.model('homework',homeworkSchema)
module.exports = homeworkModel