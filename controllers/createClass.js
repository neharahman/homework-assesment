const classModel =require('../models/classModel.js')
module.exports.createClass=async (req,res)=>{
    try{
        const {name,timing}=req.body
        const create_classModel =await new classModel({
            name,timing
        })
        const save_classModel= await create_classModel.save();
        res.send(save_classModel)
    }catch(err){
        if(err) console.log(err)
    }
    
}

module.exports.allClass=async (req,res)=>{
    const {name,timing}=req.body
    const findAll = await classModel.find()
    res.send(findAll)
}