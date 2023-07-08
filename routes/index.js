const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todos = require('./modules/todos')
// 將req導向home模組
router.use('/', home)
// 如果網址前綴以/todos開頭 就導向todos模組裡
router.use('/todos', todos)
module.exports = router