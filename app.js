const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
// 加入bp 才能把req.body轉成我們想要的格式
const bodyParser = require('body-parser')
// 載入method-module
const methodOverride = require('method-override')
const flash = require('connect-flash') // flash 是和 express.js 搭配 用來做flash message 的套件，給予使用者即時提醒，通常在畫面跳轉後會消失 也就是只存在一個 req~res cycle 中
// const COCK = require('./config/test')
require('./config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  // 如果不在 正式上線環境(production) 就透過dotenv去讀取在env檔案的資訊
  // 如果在正式上線模式 通常會自動新增 NODE_ENV 並設值為production 因此可用
  // 這個來做判斷
  require('dotenv').config
}
// 引用路由器
// 引入路由器時 若路徑設定為/routes 就會自動去尋找目錄下名為index的檔案
// 所以這裡其實是在 require routes底下的 index.js
const routes = require('./routes')

// 載入 passport 設定檔 必需要在express-session 之後
// 定義 passport 函式
const usePassport = require('./config/passport')

///
// 設定app為express伺服器
// 這個伺服器屬於應用程式 和資料庫伺服器不同
const app = express()
const port = process.env.PORT
// =============view=================
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')







// 設定session
// 在應用程式伺服器上 用來存放使用者狀態的機制 稱為 session
// 實作角度上看 session 是指程式伺服器上的儲存方案(一個儲存空間) 專門用來儲存使用者狀態
app.use(session({
  secret: process.env.SESSION_SECRET, //session用來驗證 session id 的字串．該字串由伺服器設定 一般不會洩漏給用戶端
  resave: false, // resave 為true時 每一次與使用者互動後 強制把 session 更新到 session store中
  saveUninitialized: true //強制將未初始化的 session 存回 session store: 未初始化＝這個 session 是新的 沒有修改過的，例如未登入的使用者的 session
}))
// 設定好後 在application NETWORK 裡面就會看到sid  由 session id 和 signature(就是只有伺服器才知道的secret) 組成


// 調用 usePassport 函式 並傳入必要參數 app
// !!!!必須放在 app.use(session)之後
// 因為session裡面定義了secert 是用來驗證session id的字串
usePassport(app)
app.use(flash()) // 掛載套件
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  // 透過 req.flash~res.locals 的接力，最後就可以在前端樣板使用
  res.locals.success_msg = req.flash('success_msg') // 設定 success msg
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// app.use 規定每一筆請求都需要透過bp進行前處理
//需要在網址使用query string "?" 例如?_method=xx 當路由設定了這組字串
// 就會覆蓋html form預設的post方式
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// 將request導入
app.use(routes)

app.listen(port, () => {
  console.log('server is running now')
})
//