const User = require("../db/models/user.model")
const jwt = require("jsonwebtoken")
const { findOne } = require("../db/models/user.model")

const authAdmin = async(req,res,next)=>{
    
    try{
       const token = req.header("Authorization")
       const decoded = jwt.verify(token,"project")
       const Admin = await User.findOne({
           _id:decoded._id,
           "tokens.token":token,
        }
       )
       if(Admin.role!="admin") throw new Error("You are not authorized")
       req.user=Admin
       req.token=token
       next()
    }
    
    catch(e) {
        res.status(500).send({
        apiStatus: false,
        errors: e.message,
        message: "You are not authorized"
        })
        
    }
}

module.exports= authAdmin