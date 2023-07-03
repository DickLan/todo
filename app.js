const express = require('express')
// 設定app為express伺服器
// 這個伺服器屬於應用程式 和資料庫伺服器不同
const app = express()
const port = 3000
const mongoose = require('mongoose')

// 加入這行 限制：只在非正式環境時 使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常檢測
db.on('error', () => {
  console.log('mongodb error666!')
})
// 連線成功 另外 執行callback後就會解除監聽器
db.once('open', () => {
  console.log('mongodb connected!')
})


app.get('/', (req, res) => {
  res.send('Web shjow')
})

app.listen(port, () => {
  console.log('server is running now')
})