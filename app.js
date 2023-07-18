const express = require('express')
const exphbs = require('express-handlebars')
// 加入bp 才能把req.body轉成我們想要的格式
const bodyParser = require('body-parser')
// 載入method-module
const methodOverride = require('method-override')

require('./config/mongoose')
// const COCK = require('./config/test')
// 設定app為express伺服器
// 這個伺服器屬於應用程式 和資料庫伺服器不同
const app = express()
const port = 3000
// =============view=================
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')


// app.use 規定每一筆請求都需要透過bp進行前處理
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//需要在網址使用query string "?" 例如?_method=xx 當路由設定了這組字串
// 就會覆蓋html form預設的post方式

// 引用路由器
// 引入路由器時 若路徑設定為/routes 就會自動去尋找目錄下名為index的檔案
// 所以這裡其實是在 require routes底下的 index.js
const routes = require('./routes')
// 將request導入
app.use(routes)


app.listen(port, () => {
  console.log('server is running now')
})