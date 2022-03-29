const postModel = require("../db/models/post.model")

class Post {

static addPost = async(req, res) =>{
    try{
        const postData = new postModel({userId: req.user._id, ...req.body})
        await postData.save()

        res.status(200).send({
            apiStatus: true,
            data: postData,
            message: "New Post Added"
        })
    }

    catch(e){
        res.status(500).send({
            apiStatus: false,
            errors: e.message,
            message: "faild to add post"
        })
    }

}

static myPosts = async(req,res)=>{
    try{
        await req.user.populate("userPosts")
        res.status(200).send({data: req.user.userPosts})
    }
    catch(e){
        res.status(500).send({erros:e.message})
    }
}

}

module.exports=Post