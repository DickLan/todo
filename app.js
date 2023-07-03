const express = require('express')
const exphbs = require('express-handlebars')
// 設定app為express伺服器
// 這個伺服器屬於應用程式 和資料庫伺服器不同
const app = express()
const port = 3000

// =========================model========
const mongoose = require('mongoose') // 載入mongoose
const Todo = require('./models/todo') //載入Todo model
// 讓這個app.js裏麵 也可以使用todo.js的內容

// 加入這行 限制：只在非正式環境時 使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 設定連線到mongoDB 當程式執行到這一行時 就會和資料庫連線
// 我們傳入連線字串，讓程式知道要去哪裡尋找資料庫
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
// 執行mongoose.connect後會得到一個連線狀態，所以我們設定一個參數
// 把連線狀態保存下來 才能繼續使用
const db = mongoose.connection
// 連線異常檢測
db.on('error', () => {
  console.log('mongodb error666!')
})
// 連線成功 另外 執行callback後就會解除監聽器
db.once('open', () => {
  console.log('mongodb connected!')
})

// =============view=================

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(errro => console.log(error))
})

app.listen(port, () => {
  console.log('server is running now')
})