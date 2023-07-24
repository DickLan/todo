const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth') //掛載 middlewaire
// 將req導向home模組
// 如果requset路徑是 '/' 就執行 modules/home 裡的程式碼

router.use('/todos', authenticator, todos) //加入驗證程序
router.use('/users', users)
// 定義寬容的路由 通常會放在最下方 因為程式是由上而下依序執行 若先'/' 就會先跑到 '/' 的頁面
router.use('/', authenticator, home) //加入驗證程序 若auth驗證成功 才next進入home 反之回到登入頁
// 如果網址前綴以/todos開頭 就導向todos模組裡
module.exports = router