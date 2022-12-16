const express = require('express')  // require
const app = express()
const port = 3000

const postRouter = require('./routes/posts.js')
const commentRouter = require('./routes/comments.js')
const connect = require('./schemas/')
connect()

app.use(express.json());    // 바디에 데이터가 들어왔을때 사용할 수 있도록 만들어준답
app.use("/posts", [postRouter,commentRouter])

app.get('/', (req,res) => {
    res.send('첫페이지 입니다')
})

app.listen(port, () => {
    console.log(port, '포트로 서버를 열었어요( app.listen )')
})


// app.post('/', (req, res) => {
//     console.log(req.body)
//     res.send('req.body 실행')
// })
//
// app.get("/", (req, res) => {
//     console.log(req.query)
//     res.send('req.query 실행')
// })
//
// app.get('/:id', (req, res) => {
//     console.log(req.params)
//     res.send(':id / req.params 실행')
// })

