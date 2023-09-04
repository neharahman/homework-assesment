const studentModel = require("../models/studentModel")
const taskModel = require("../models/taskModel")
const { createToken, verifyToken } = require("../other/jwtToken")

module.exports.studentSignup = async (req,res)=>{
    try{
        const {name,mobile,age,address,username,password,class_id} = req.body
        console.log('inside student controller')

        const create_studentModel= await new studentModel({name,mobile,age,address,password,class_id})
        const save_studentModel =await create_studentModel.save()
        res.status(200).json({
            status:'successefull',
            message:'student created',
            data:save_studentModel
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



module.exports.studentLogin = async (req,res)=>{
    try{
        console.log('inside student login')
        const {mobile,password} = req.body
        const isMobileExist = await studentModel.findOne({mobile:mobile})
        if(isMobileExist && isMobileExist.password==password)
        {
            let jwt = await createToken(isMobileExist)
                res.status(200).json({
                    status:'success',
                    message:'succefully login',
                    token:jwt
                })
        }
        else
        {
            res.status(401).json({
                status:'failure',
                message:'please check mobile number or password'
            })
        }
    }catch(err){
        if(err) console.log('error inside studentLogin',err)
        res.status(404).json({
            status:'failure',
            message:'something went wrong please try after some time',
            error:err
        })
    }
    
}


module.exports.allTask = async (req,res) =>{
    try{
        console.log('inside allTask')
        const {authorization} =req.headers
        const findAllTask = await taskModel.find({taskFlag:req.body.taskFlag});
            res.status(200).json({
                status:'successefull',
                message:'all task',
                
                data:findAllTask
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

module.exports.allStudent = async (req,res) =>{
    try{
        console.log('inside allStudent')
        const {authorization} =req.headers
        const findAllStudent = await studentModel.find();
            res.status(200).json({
                status:'successefull',
                message:'all task',
                total:findAllStudent.length,
                data:findAllStudent
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


module.exports.assignedTaskToStudent = async (req,res) =>{
    try{
        console.log('inside assignedTaskToStudent')
        const {authorization} = req.headers;
        const jwt =await verifyToken(authorization)
        console.log('jwt token',jwt)

        let task = await taskModel.findOne({class_id:jwt.obj.class_id}).populate('batch_id')
        console.log('task',task)
        res.status(200).json({
            status:'success',
            message:'displaying assigned task',
            data:task
        })

    }catch(err){
        if(err) console.log('error inside assignedTaskToStudent',err)
    }
}

