const express = require('express')
const mongoose = require('mongoose') // 載入mongoose
const exphbs = require('express-handlebars')
// 加入bp 才能把req.body轉成我們想要的格式
const bodyParser = require('body-parser')
// 讓這個app.js裏麵 也可以使用todo.js的內容
const Todo = require('./models/todo') //載入Todo model
const todo = require('./models/todo')

// 設定app為express伺服器
// 這個伺服器屬於應用程式 和資料庫伺服器不同
const app = express()

const port = 3000

// =========================model========



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
  // .catch(error =>)

})


// =============view=================


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// app.use 規定每一筆請求都需要透過bp進行前處理
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(errro => console.log(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log('err'))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id) // 從資料庫找出資料
    .lean()//因為不想讓mongoose幫我們多處理資料 所以用lean 把資料轉成單純的js物件
    // 撈資料後若想render 就要先用lean()
    .then((todo) => res.render('detail', { todo }))//然後把資料送給前端樣板
    .catch(error => console.log(errro))
})




app.listen(port, () => {
  console.log('server is running now')
})