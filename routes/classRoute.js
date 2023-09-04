const express = require('express')
const route = express.Router()
const {createClass,allClass} = require('../controllers/createClass.js')

route.post('/create',createClass)
route.post('/all',allClass)

module.exports=route