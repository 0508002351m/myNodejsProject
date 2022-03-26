const multer = require("multer")
const fs = require("fs")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"upload")
    },
    filename:function(req,file,cb){
        const myFileName= Date.now()+ path.extname(file.originalname)
        cb(null,myFileName)
    }

})

const upload = multer({
    storage,
    fileFilter:function(req,file,cb){
        if(path.extname(file.originalname)!= [".jpg" || ".png"] )
        return cb(new Error("Invalid extension"))
        cb(null,true)
    }
})


module.exports=upload