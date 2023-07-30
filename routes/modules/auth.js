const express = require('express')
const router = express.Router()

const passport = require('passport')
// auth/facebook 是向fb發出請求 scope內的參數 是我們向fb要求的資料
router.get('/facebook', passport.authenticate('facebook', {
  // scope: ['email', 'public_profile']
}))
// get .../callback 則是 fb 把資料發回來的地方
// 如果能用傳回來的資料順利登入 就放 req 通過 並進到 '/'
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))


router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))


module.exports = router