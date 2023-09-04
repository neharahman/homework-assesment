const express = require('express')
const route = express.Router()
const {studentSignup, allStudent, studentLogin, assignedTaskToStudent} = require('../controllers/studentController.js')

route.post('/create',studentSignup)
route.post('/login',studentLogin)
route.get('/all',allStudent)
route.get('/task',assignedTaskToStudent)

module.exports=route