const mongoose = require('mongoose')
// const {Schema} = require("mongoose"); / type: Schema.Types.ObjectId,

const commentsSchema = new mongoose.Schema({
    // postId: {
    //     type: String,
    //     // required: true, //not null
    //     required: true,
    // },

    user: {
        type: String,
        required: true,

    },

    password: {
        type: Number,
        required: true
    },

    content : {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("comments", commentsSchema)