const batchModel = require("../models/batchModel")

module.exports.batchCreate = async (req,res) =>{
    try{
        console.log('inside batch')
        
        const {subject,class_id,teacher_id} =req.body
        const create_batchModel = await new batchModel({
            subject,class_id,teacher_id
        })
        const save_batchModel = await create_batchModel.save();
        res.status(200).json({
            status:'successefull',
            message:'batch inserted',
            data:save_batchModel
        })

    }catch(err){
        if(err) console.log(err)
        res.status(401).json({
            stats:'fail',
            message:'something went wrong plaese try again',
            error:err

        })
    }

}
module.exports.allBatch = async (req,res) =>{
    try{
        console.log('inside allBatch')
        const {authorization} =req.headers
        const findAllBatch = await batchModel.find();
        res.status(200).json({
            status:'successefull',
            message:'all batch',
            total:findAllBatch .length,
            data:findAllBatch 
        })

    }
    catch(err){
        if(err) console.log(err)
        res.status(401).json({
            stats:'fail',
            message:'something went wrong plaese try again',
            error:err

        })
    }

}