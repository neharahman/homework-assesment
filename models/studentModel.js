const mongoose = require("mongoose");
const {Schema} = require("mongoose")

let studentSchema = new Schema({
    name:{
        type:String,
    },
    mobile:{
        type:Number
    },
    age:{
        type:Number
    },
    address:{
        type:String
    },
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class'
    },
    password:{
        type:String
    }

})

const studentModel = mongoose.model('student',studentSchema)
module.exports=studentModel;