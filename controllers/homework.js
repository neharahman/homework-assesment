const AWS = require('aws-sdk');
const fs = require('fs')
const PDFDocument = require('pdfkit');
require("aws-sdk/lib/maintenance_mode_message").suppress = true
require('dotenv').config()

const { verifyToken } = require("../other/jwtToken");
const homeworkModel = require("../models/homeworkModel")




const AWSCredentials = {
    accessKey: process.env.AWS_ACCESS_KEY,
    secret: process.env.AWSSECRET,
    bucketName: process.env.AWS_BUCKET
};

const s3 = new AWS.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret
});
module.exports.homeworkUpload = async (req,res) =>{
    try{
        console.log('inside homework')
        const {task_id,teacher_id,class_id,marks,link,checked}=req.body
        const {authorization} = req.headers
        const file=req.files
        

        const jwt = await verifyToken(authorization)
        console.log('jwt token',jwt)
        let unique_name_s3=`${jwt.obj.name}-${+new Date()}`

        console.log('printing the file',file.image1.data)
        doc = new PDFDocument
        console.log(file.image1)
       // Pipe its output somewhere, like to a file or HTTP response 
        doc.pipe(fs.createWriteStream(`docPdf.pdf`))

        //Add an image, constrain it to a given size, and center it vertically and horizontally 
        doc.image(file.image1.data, {
        fit: [500, 400],
        align: 'center',
        valign: 'center'
        });

        doc.addPage()
        .image(file.image1.data, {
        fit: [500,400],
        align: 'center',
        valign: 'center'
        });
        await doc.end()
        const params = {
            Bucket: AWSCredentials.bucketName,
            Key: `${unique_name_s3}.pdf`,
            Body: fs.createReadStream(`docPdf.pdf`)
        };

        // Uploading files to the bucket
        let location = await s3.putObject(params).promise()
        // https://studentpdf.s3.ap-south-1.amazonaws.com/meena-1693811837428.pdf
        //<------------------------------------------------------------------------------------------->
        //<------------------------------------------------------------------------------------------->
        fs.unlink('docPdf.pdf',function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
        });  
        const create_homeworkModel = await homeworkModel({
            student_id:jwt.obj._id,task_id,teacher_id,class_id,link:`https://studentpdf.s3.ap-south-1.amazonaws.com/${unique_name_s3}.pdf`
        })
        const save_homeworkModel = await create_homeworkModel.save()
        res.status(200).json({
            status:'success',
            message:'student successfully upload task',
            data:save_homeworkModel
        })
        

    }catch(err){
        console.log('error inside homework',err)
        throw err
    }
}


module.exports.homeworkChecking = async (req,res) =>{
    try{
        console.log('inside homeworkChecking')
        const {authorization} = req.headers
        const {marks} =req.body

        const jwt_token = await verifyToken(authorization)
        console.log('jwt token',jwt_token)
        let findTeacher_homeworkModel = await homeworkModel.findOne({teacher_id:jwt_token.obj._id})
        console.log('findTeacher_homeworkModel',findTeacher_homeworkModel)
        if(!findTeacher_homeworkModel.checked){
            const updateMarks_homeworkModel = await homeworkModel.updateOne({marks:marks,checked:true})
            res.send(updateMarks_homeworkModel)
        }
    }catch(err){
        console.log('error inside homeworkChecking',err)
        throw err
    }
}