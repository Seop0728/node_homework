const express = require("express")
const Posts = require("../schemas/posts.js")
const router = express.Router();


//게시글 조회
router.get("/", async (req, res) => {
    const existPosts = await Posts.find({})
    res.status(200).json({existPosts})
})

//게시글 상세조회
router.get('/:_postId', async (req, res) => {
    // const postId = req.params.postId  // params string
    const {_postId} = req.params // params { postId: '62d6cc66e28b7aff02e82954' }


    const existPosts = await Posts.find({_id: _postId})

    res.status(200).json({existPosts})
})

// 게시글 작성
router.post("/", async (req, res) => {
    const {user, password, title, content} = req.body

    // const posts = Posts.find({postsId})  //db에 이름이 있는지 조회

    if (!user || !password || !title || !content) {
        return res.status(400).json({
            success: false,
            message: "데이터형식이 올바르지 않습니다."
        })
    }
    const createdPosts = await Posts.create({user, password, title, content});
    res.status(201).json({posts: createdPosts});
})

// 게시물 수정
router.put('/:_postId', async (req, res) => {
    const {_postId} = req.params;       // 이보형
    const {password, title, content} = req.body;    // 정보

    const existsPosts = await Posts.find({_id : _postId});  //
    const [postPw] = existsPosts.map((post) => post.password);

    //const postPw = existsPosts[0].password;   // 보형님 pw
    if (postPw === password) {      // Db보형pw === input보형pw
        await Posts.updateOne(
            {_id: _postId},
            {$set: { title, content}});
        return res.status(200).json(
            {"message": "게시글을 수정하였습니다."});
    } else {
        return res.status(400).json(
            {"message": "비밀번호가 틀렸습니다."});
    }
});

// 게시물 삭제
router.delete('/:_postId', async (req, res) => {
    const {_postId} = req.params;
    const {password} = req.body;

    const existsPosts = await Posts.find({_id : _postId});

    // const [postPw] = existsPosts.map((post) => post.password);
    const postPw = existsPosts[0].password;

    if (postPw === password) {
        await Posts.deleteOne({_id : _postId});
        res.status(200).json({message: "게시물 삭제완료"});
    }else {
        return res.status(400).json(
            {"message": "비밀번호가 틀렸습니다."});
    }
})

//     const existsPosts = await Posts.find()
//     // const postId = existsPosts.map((post) => post._id)
//     const postPw = existsPosts.map((post) => post.password)
//
//     //데이터가 여러개일때
//     // for (const p_id of postId)
//     for (let i = 0; i < postId.length; i++) {
//         if (postId[i] === _postId) {
//             console.log(postId._id)
//             if(postPw === password) {
//                 await Posts.updateOne(
//                     {postId: _postId},
//                     {$set: (password, title, content)})
//                 return res.status(201).json(
//                     {"message": "게시글을 수정하였습니다."})
//             } else {
//                 return res.status(400).json(
//                     {"message": "비밀번호가 틀렸습니다."})
//             }
//         }
//     }
//       return res.status(400).json(
//           {"message": "아이디가 없습니다."}
//       )
// })
// for (let i = 0; i < postId.length; i++) {
//         if (아이디 검사) {
//             if(비밀번호 검사) {
//                     db에 업데이트(
//             }else{
//                 비빌번호가 틀렸어염
//             }
//         }
//     }
//     아이디가 없습니다

module.exports = router

