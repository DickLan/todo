const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')
router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({ userId: userId }) // 1.尋找 屬於登入使用者的 todo  2.可以縮寫只寫一次
    .lean()
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))
})

module.exports = router