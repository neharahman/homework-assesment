const express = require('express')
const route = express.Router()
const {teacher, allTeacher, findByGenderTeacher, findByDegree, teacherLogin} = require('../controllers/teacher.js')

route.post('/create',teacher)
route.post('/login',teacherLogin)
route.get('/all',allTeacher)
route.post('/all/gender',findByGenderTeacher)
route.post('/all/degree',findByDegree)

module.exports=route