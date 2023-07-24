const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       console.log('Error occurred:', err);
//       return next(err);
//     }
//     if (!user) {
//       console.log('Authentication failed:', info.message);
//       return res.redirect('/users/login');
//     }
//     // 如果驗證成功，則使用 req.login 進行登入
//     req.login(user, (err) => {
//       if (err) {
//         console.log('Error occurred during login:', err);
//         return next(err);
//       }
//       console.log('Login success:', user);
//       return res.redirect('/');
//     });
//   })(req, res, next);
// });


router.get('/logout', (req, res) => {
  req.logout() //passport.js提供的函式 會清除session
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {
    // 如果已經註冊 就退回原本註冊畫面
    if (user) {
      console.log('already registered.')
      res.render('register', {
        name, email, password, confirmPassword
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