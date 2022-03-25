const mongoose = require("mongoose")
const validator = require("validator")
const postSchema = new mongoose.Schema({
    postType:{
        type:String,
        trim:true,
        required:true,
      }
},
{timestamps:true})

const Post = mongoose.model('Post',postSchema)
module.exports=Post