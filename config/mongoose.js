const mongoose = require('mongoose') // 載入mongoose

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
  // .catch(error =>
})

module.exports = db
// module.exports = db