
const bcrypt = require('bcryptjs')
if (process.env.NOVE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Todo = require('../todo') // 從上級目錄 被todo.js匯出的todo 載入 todo model
const User = require('../user')
const SEED_USER = {
  name: 'root',
  email: 'root@com',
  password: '111'
}

// 取得資料庫連線狀態
// 當require另一個檔案時，該檔案內的所有程式碼將會被自動執行
// 連線成功 另外 執行callback後就會解除監聽器
db.once('open', () => {
  console.log('seeder mongodb connected!')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      // promise 會確保收到回應後，才進入下一段then
      return Promise.all(Array.from(
        { length: 10 },
        (_, i) => Todo.create({ name: `name-${i}`, userId })
      ))
      // 不用單純 for loop 是因為非同步問題，有可能 create 請求才被呼叫 下一段就已經process.exit
      // for (let i = 0; i < 10; i++) {
      //   Todo.create({ name: `name-${i}`, userId })
      // }
    })
    .then(() => {
      console.log('seeder createed done')
      process.exit()
    })

})