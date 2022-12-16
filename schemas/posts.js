const mongoose = require('mongoose')
// const {Schema} = require("mongoose"); / type: Schema.Types.ObjectId,



const postsSchema = new mongoose.Schema({
    // postId: {
    //     type: Number,
    //     // required: true, //not null
    //     default: 1
    // },

    user: {
        type: String,
        required: true,

    },

    password: {
        type: Number,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content : {
        type: String,
        required: true
    },

    createdAt : {
        type: Date,
        default: Date.now()
        // default: Date.now(), 대세임
    }
})

module.exports = mongoose.model("posts", postsSchema)


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
//--------게시물 삭제
// if (dbPw === inputPw) {
//     게시물삭제
// } else {
//     비밀번호 틀림
// }