 const router = require("express").Router()
router.get("/", (req,res)=>res.send("post routes"))
module.exports=router