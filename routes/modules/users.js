const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

const loginSuccessMessage = (req, res, next) => {
  req.flash('success_msg', '您已成功登入')
  next()
}
router.post('/login', loginSuccessMessage, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

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
      console.log('already registered.')
      res.render('register', {
        errors, name, email, password, confirmPassword
      })
    } else {
      // 如果還沒註冊 就寫入資料庫
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))

      // 也可以寫成
      // const newUser = new User({
      //   name,
      //   email,
      //   password
      // })
      // newUser.save()
      //   .then(() => res.redirect('/'))
      //   .catch(error => console.log(error))
    }
  })
    .catch(error => console.log(error))
})


module.exports = router