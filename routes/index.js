const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const auth = require('./modules/auth')   // 引用模組
const { authenticator } = require('../middleware/auth')  // 掛載 middleware


// 條件越寬鬆的 router 要放越下面
// 如果網址前綴以/todos開頭 就導向todos模組裡
router.use('/todos', authenticator, todos) // 加入驗證程序
router.use('/users', users)
router.use('/auth', auth) //掛載模組
// 如果requset路徑是 '/' 就執行 modules/home 裡的程式碼
// 將req導向home模組
router.use('/', authenticator, home) // 加入驗證程序
module.exports = router