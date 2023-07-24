const passport = require('passport')
// 需注意 LS 的載入方式 是官方的指定寫法 必續這樣寫 .Strategy
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
// 這裡匯出的是一個 function
// 在其他地方調用時 app 會是函示的參數
// 也可以寫成 module.exports = function (app) {
// ...
// }
module.exports = app => {
  // 初始化 passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略:選擇驗證方式
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Mail not registered!' })
        }
        if ((user.password !== password)) {
          return done(null, false, { message: "Email or password incorrect." })
        }
        return done(null, user, { message: 'login success!' })
      })
      .catch(err => done(err, null))
  }))

  // 設定序列化與反序列化  使用者id:使用者資料 的配對
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })

}
