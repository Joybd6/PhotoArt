const { type } = require("express/lib/response");
const mon= require("mongoose")

const Posts= mon.Schema({
    user: {
        type: mon.Schema.Types.ObjectId,
        ref: "user"
    },
    title:{
        type: String,
        required:true
    },
    imageURL: {
        type: String,
        required: true
    },
    access: {
        type: Boolean,
        required: true
    },
    likes: {
        type: [{type:mon.Schema.Types.ObjectId,ref:"user"}],
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const post = mon.model("post",Posts);

module.exports=post;