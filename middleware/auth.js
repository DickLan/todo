module.exports = {
  authenticator: (req, res, next) => {
    console.log(`req.isAuthenticated()=${req.isAuthenticated()}`)
    if (req.isAuthenticated()) {
      console.log('y')
      return next()
    }
    console.log('N')
    res.redirect('/users/login')
  }
}
