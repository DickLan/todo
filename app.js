const express = require('express')
// 設定app為express伺服器
// 這個伺服器屬於應用程式 和資料庫伺服器不同
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Web shjow')
})

app.listen(port, () => {
  console.log('server is running now')
})