const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOcock_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const cock = mongoose.connection
cock.on('error', () => {
  console.log('mongocock error!')
})
cock.once('open', () => {
  console.log('mongocock connected!')
})

console.log('text mes from test.js')
module.exports = cock