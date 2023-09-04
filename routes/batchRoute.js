const express = require('express')
const route = express.Router()
const { batchCreate, allBatch } = require('../controllers/batch.js')

route.post('/create',batchCreate)
route.get('/all',allBatch)


module.exports=route