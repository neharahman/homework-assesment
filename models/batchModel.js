const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const batchSchema= new Schema({
    subject:{
        type:String
    },
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class'
    },
    teacher_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    }
})

const batchModel  = mongoose.model('batch',batchSchema)
module.exports = batchModel 