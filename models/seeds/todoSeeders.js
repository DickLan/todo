const db = require('../../config/mongoose')
const Todo = require('../todo') // 從上級目錄 被todo.js匯出的todo 載入 todo model
// 取得資料庫連線狀態
// 當require另一個檔案時，該檔案內的所有程式碼將會被自動執行

// 連線成功 另外 執行callback後就會解除監聽器
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done.')
})