// 每一種資料都會有個獨路文件來管理 例如todo資料會由
// todo.js來管理
// 這個資料的 資料綱要（框架）就由此定義(Schema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  userId: { //加入關聯設定
    // 翻譯： 去參照 User 的 ObjectId ．這是Mongoose提供的 collections 一對多關聯的功能 又稱 populate 讓我們能建立不同 Ｃ 之間的關聯
    type: Schema.Types.ObjectId, // 定義 UserId 這個項目是一個 ObjectId 也就是他會連向另一個資料物件
    ref: 'User', // 參考對象是 User model
    index: true, // 把 userId 設為索引，當我們常常使用某個欄位來查找資料時，可以考慮將欄位設為索引，可以增加查詢資料時的讀取效能
    require: true
  }
})
// 匯出一個名為Todo的模型 該模型用mongoose.model()方法創建 並且依照todoSchema這個樣式
// 這樣在另一個文件如app.js就能用 const Todo = require('./todo.js')來引入todo模型
module.exports = mongoose.model('Todo', todoSchema)
