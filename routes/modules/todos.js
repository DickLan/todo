const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')



// 前往"新增“頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增一筆資料
router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  return Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定資料 detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  // 改成 fineOne 後 mongoose 就不會自動轉換 _id to id ，所以這裡要寫和資料庫一樣的屬性名稱
  // 從資料庫找出資料 而且屬於使用者的 todo
  return Todo.findOne({ _id, userId })
    .lean()//因為不想讓mongoose幫我們多處理資料 所以用lean 把資料轉成單純的js物件     // 撈資料後若想render 就要先用lean()
    .then((todo) => res.render('detail', { todo }))//然後把資料送給前端樣板
    .catch(error => console.log(error))
})


// 前往"修改“頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})



// 修改特定資料
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body //一次assign兩個屬性存成變數
  // 解構賦值
  return Todo.findOne({ _id, userId }) //查詢資料
    .then(todo => { //如果查詢成功 
      todo.name = name //修改 之後重新儲存資料
      todo.isDone = isDone === 'on'
      return todo.save()//因為要用todo.save 所以這裡不用lean
    })
    //非同步（一次執行多任務的）的各階段，最好都用then來銜接
    .then(() => {
      res.redirect(`/todos/${_id}`) //這裡的/是指route的根目錄
      // 就是 localhost:3000/這個位置 所以要重回details
      // 必須加上/todos
      console.log(123)
    })
    .catch(error => console.log(error))

})

// 刪除特定資料
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router