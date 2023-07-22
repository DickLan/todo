const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
// 加入bp 才能把req.body轉成我們想要的格式
const bodyParser = require('body-parser')
// 載入method-module
const methodOverride = require('method-override')

// const COCK = require('./config/test')
require('./config/mongoose')

// 引用路由器
// 引入路由器時 若路徑設定為/routes 就會自動去尋找目錄下名為index的檔案
// 所以這裡其實是在 require routes底下的 index.js
const routes = require('./routes')

// 載入 passport 設定檔 必需要在express-session 之後
// 定義 passport 函式
const usePassport = require('./config/passport')

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

// 調用 usePassport 函式 並傳入必要參數 app
usePassport(app)

// 將request導入
app.use(routes)

// 設定session
// 在應用程式伺服器上 用來存放使用者狀態的機制 稱為 session
// 實作角度上看 session 是指程式伺服器上的儲存方案(一個儲存空間) 專門用來儲存使用者狀態
app.use(session({
  secret: 'ThisIsMySecret', //session用來驗證 session id 的字串．該字串由伺服器設定 一般不會洩漏給用戶端
  resave: false, // resave 為true時 每一次與使用者互動後 強制把 session 更新到 session store中
  saveUninitialized: true //強制將未初始化的 session 存回 session store: 未初始化＝這個 session 是新的 沒有修改過的，例如未登入的使用者的 session
}))
// 設定好後 在application NETWORK 裡面就會看到sid  由 session id 和 signature(就是只有伺服器才知道的secret) 組成

app.listen(port, () => {
  console.log('server is running now')
})