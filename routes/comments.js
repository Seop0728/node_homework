const express = require("express")
const Comments = require('../schemas/comments.js')
const Posts = require('../schemas/posts.js')
const router = express.Router();

// 댓글 생성
router.post("/comments/:_postId", async (req, res) => {
    const {_postId} = req.params
    const {user, password,content} = req.body

    if (!user || !password || !content) {
        return res.status(400).json({
                success: false,
                message: "(댓글)데이터 형식이 올바르지 않습니다."
        })
    }
    if (!content) {
        return res.status(400).json({
            success: false,
            message: '댓글 내용을 입력해주세요.'
        })
    }
    const createdComments = await Comments.create({user, password,  content})
    res.status(201).json({comments: createdComments})
})

// 댓글 조회
router.get("/comments/:_postId", async (req,res) =>{
    const {_postId} = req.params

    const existsPosts = await Comments.findOne({_id: _postId})
    res.status(200).json({existsPosts})
})

// 댓글 수정
router.put("/comments/:_commentId", async (req,res) => {
    const {_commentId} = req.params;
    const {password, content} = req.body;

    const existsComments = await Comments.find({_id: _commentId})
    const [commentPw] = existsComments.map((comment) => comment.password);

    //const postPw = existsPosts[0].password;   // 보형님 pw
    if (commentPw === password) {      // Db보형pw === input보형pw
        await Comments.updateOne(
            {_id: _commentId},
            {$set: { content}});
        return res.status(200).json(
            {"message": "게시글을 수정하였습니다."});
    } else {
        return res.status(400).json(
            {"message": "비밀번호가 틀렸습니다."});
    }
})
// 댓글 삭제
router.delete("/comments/:_commentId", async (req, res) => {
    const {_commentId} = req.params;
    const {password} = req.body;

    const existsComments = await Comments.find({_id : _commentId});

    const commentPw = existsComments[0].password;

    if (commentPw === password) {
        await Comments.deleteOne({_id : _commentId});
        res.status(200).json({message: "게시물 삭제완료"});
    }else {
        return res.status(400).json(
            {"message": "비밀번호가 틀렸습니다."});
    }
})

module.exports = router