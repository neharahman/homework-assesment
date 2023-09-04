const bodyParser = require('body-parser')
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const app=express();
const fileUpload = require('express-fileupload')
const studentRoute = require('./routes/studentRoute.js')
const classRoute = require('./routes/classRoute.js')
const teacherRoute = require('./routes/teacherRoute.js')
const batchRoute = require('./routes/batchRoute.js')
const taskRoute = require('./routes/taskRoute.js')
const homeworkRoute = require('./routes/homeworkRoute.js');
const { homework } = require('./controllers/homework.js');


//bodyparse
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload())


//db connection
let db=process.env.DATABASE.replace('<USER>',process.env.USERNAME).replace('<PASSWORD>',process.env.PASSWORD)
console.log(db)

mongoose.connect(db).then(()=>{console.log('db connected')}).catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.send('hello get route')
})

app.use('/student',studentRoute)
app.use('/class',classRoute)
app.use('/teacher',teacherRoute)
app.use('/batch',batchRoute)
app.use('/task',taskRoute)
app.use('/homework',homeworkRoute)



app.listen(process.env.PORT,()=>{
    console.log('listen to the server')
})