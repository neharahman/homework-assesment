const express = require('express')
const { createTask, allTask } = require('../controllers/task')
const route = express.Router()

route.post('/create',createTask)
route.post('/all',allTask)

module.exports=route