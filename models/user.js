const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
    // Date.now vs Date.now()
    // 沒():代表傳入的是函式本身
    // 這是mongoose lib做好的機制，當default是函式時 mongoose就會把他記住，然後在每次建立資料的當下，去執行並獲得預設值
    // 在js中 我們能將 函式當成物件屬性 所以可以把Date.now這函式當作createdAt的屬性，當伺服器將註冊資料送給資料庫時，才會執行Date.now並產生當下的時間戳記
    // 這裡只是一個引用，意味著，當使用者使用mongoose.model創建user模型，並儲存新User時，才會被執行

    // 有():代表直接呼叫這個函式，並傳入函式的回傳值
    // 若使用Date.now()則會在伺服器建立並運作的當下，就被執行
  }
})

module.exports = mongoose.model('User', userSchema)