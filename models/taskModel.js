const mongoose = require('mongoose')
const {Schema} = require("mongoose")

const taskSchema = new Schema({
    task:{
        type:String
    },
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class'
    },
    teacher_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    },
    batch_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'batch'
    },
    taskFlag:{
        type:Boolean
    }

})

const taskModel  = mongoose.model('task',taskSchema)
module.exports = taskModel 