const teacherModel = require("../models/teacherModel")
const { createToken } = require("../other/jwtToken")

module.exports.teacher = async (req, res) => {
    try {
        console.log('inside taecher create')
        const { name, mobile, gender, degree, address, password, age } = req.body
        const create_teacherModel = await new teacherModel({
            name, mobile, address, password, gender, degree, age
        })
        const save_teacherModel = await create_teacherModel.save()
        res.status(200).json({
            status: 'successefull',
            message: 'teacher inserted',
            data: save_teacherModel
        })
    }
    catch (err) {
        if (err) console.log(err)
        res.status(401).json({
            stats: 'fail',
            message: 'something went wrong plaese try again',
            error: err

        })
    }

}
module.exports.teacherLogin = async (req,res)=>{
    try{
        console.log('inside teacher login')
        const {mobile,password} = req.body
        const isMobileExist = await teacherModel.findOne({mobile:mobile})
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
        if(err) console.log('error inside teacherLogin',err)
        res.status(404).json({
            status:'failure',
            message:'something went wrong please try after some time',
            error:err
        })
    }
    
}

module.exports.allTeacher = async (req, res) => {
    try {
        console.log('inside allTeacher')
        const { authorization } = req.headers
        const findAllTeacher = await teacherModel.find();
        res.status(200).json({
            status: 'successefull',
            message: 'all teacher',
            total: findAllTeacher.length,
            data: findAllTeacher
        })

    }
    catch (err) {
        if (err) console.log(err)
        res.status(401).json({
            stats: 'fail',
            message: 'something went wrong plaese try again',
            error: err

        })
    }

}
module.exports.findByGenderTeacher = async (req, res) => {
    try {
        console.log('inside findByGenderTeacher')
        const { authorization } = req.headers
        const { gender } = req.body

        const findByGenderTeacher = await teacherModel.find({ gender: gender });
        console.log(findByGenderTeacher)
        res.status(200).json({
            status: 'successefull',
            message: 'finding gender',
            total: findByGenderTeacher.length,
            data: findByGenderTeacher
        })

    }
    catch (err) {
        if (err) console.log(err)
        res.status(401).json({
            stats: 'fail',
            message: 'something went wrong plaese try again',
            error: err

        })
    }

}

module.exports.findByDegree = async (req, res) => {
    try {
        console.log('inside findByDegree')
        const { authorization } = req.headers
        const { degree } = req.body

        const findByDegree = await teacherModel.find({ degree: degree });
        console.log(findByDegree)
        res.status(200).json({
            status: 'successefull',
            message: 'finding degree',
            total: findByDegree.length,
            data: findByDegree
        })

    }
    catch (err) {
        if (err) console.log(err)
        res.status(401).json({
            stats: 'fail',
            message: 'something went wrong plaese try again',
            error: err

        })
    }

}