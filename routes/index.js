const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
// 將req導向home模組
// 如果requset路徑是 '/' 就執行 modules/home 裡的程式碼
router.use('/', home)
// 如果網址前綴以/todos開頭 就導向todos模組裡
router.use('/todos', todos)
router.use('/users', users)
module.exports = router