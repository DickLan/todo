module.exports = {
  authenticator: (req, res, next) => {
    console.log(`req.isAuthenticated()=${req.isAuthenticated()}`)
    if (req.isAuthenticated()) {
      console.log('y')
      return next()
    }
    console.log('N')
    req.flash('warning_msg', '請先登入才能使用．')
    res.redirect('/users/login')
  }
}
