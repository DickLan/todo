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
  done: {
    type: Boolean
  }
})
// 匯出一個名為Todo的模型 該模型用mongoose.model()方法創建 並且依照todoSchema這個樣式
// 這樣在另一個文件如app.js就能用 const Todo = require('./todo.js')來引入todo模型
module.exports = mongoose.model('Todo', todoSchema)