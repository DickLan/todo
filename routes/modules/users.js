const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')


router.get('/login', (req, res) => {
  res.render('login')
})

// const loginSuccessMessage = (req, res, next) => {
//   req.flash('success_msg', '您已成功登入')
//   next()
// }
// router.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/users/login'
//   }))
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    // 當 passport.authenticate 驗證失敗的時候
    // user 就會是 false
    console.log(`req.body=${req.body}`)
    console.log(`user=${user}`);
    if (!user) {
      req.flash('warning_msg', '無此使用者或密碼錯誤')
      return res.redirect('/users/login')
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      req.flash('success_msg', '您已成功登入')
      console.log(user);
      return res.redirect('/')
    })
  })(req, res, next)
})


router.get('/logout', (req, res) => {
  req.logout() //passport.js提供的函式 會清除session
  req.flash('success_msg', '您已成功登出．')
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  // errors controll
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {
    // 如果已經註冊 就退回原本註冊畫面
    if (user) {
      errors.push({ message: 'User already existed.' })
      console.log('already registered.')
      res.render('register', {
        errors, name, email, password, confirmPassword
      })
    }
    // 如果還沒註冊 就寫入資料庫
    return bcrypt
      .genSalt(10) // generate sale with k 10
      .then(salt => {
        console.log(salt)
        return bcrypt.hash(password, salt)
      }) // 為使用者密碼加鹽，產生雜湊值
      .then(hash => {
        console.log(hash)
        return User.create({
          name,
          email,
          password: hash
        })
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))


  })
    .catch(error => console.log(error))
})


// return bcrypt
// .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
// .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
// .then(hash => User.create({
//   name,
//   email,
//   password: hash // 用雜湊值取代原本的使用者密碼
// }))
// .then(() => res.redirect('/'))
// .catch(err => console.log(err))

module.exports = router