const express = require('express')
const { homeworkUpload, homeworkChecking } = require('../controllers/homework')
const route = express.Router()

route.post('/student/upload',homeworkUpload)
route.post('/teacher/marks',homeworkChecking)

module.exports=route