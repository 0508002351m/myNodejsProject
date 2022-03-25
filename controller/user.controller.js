const bcrypt = require("bcryptjs/dist/bcrypt")
const userModel = require("../db/models/user.model")

class User {
    //Add New Users Function:
    static addUser = async(req, res)=> {
        try {
        const user = new userModel(req.body)
       await user.save()

       res.status(200).send({
        apiStatus: true,
        data: user,
        message: "New User Registeration"
        })
        }
        catch(e) {
        res.status(500).send({
            apiStatus: false,
            errors: e.message,
            message: "Error in registeration"
        })
        }
    }

    //Show All User: 
    static showAll = async(req, res)=> {
        try{
            const users = await userModel.find().sort({email: -1})

            res.status(200).send({
                apiStatus: true,
                data: users,
                message: "Users shown"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                errors: e.message,
                message: "There are no users"
            })
        }
    } 

    //Show Single User:
    static showSingle = async(req, res) => {
        try{
            const user = await userModel.findById(req.params.id)
            res.status(200).send({
                apiStatus:true,
                data: user,
                message: "User Info"
            })
        }

        catch(e) {
            res.status(500).send({
                apiStatus: false,
            errors: e.message,
            message: "Can't Show User"
            })
            
        }
    }

//Delete User:
static delUser = async(req, res) => {
    try{
        const user = await userModel.findByIdAndDelete(req.params.id)
        
        res.status(200).send({
            apiStatus:true,
            data: user,
            message: "User Erased"
        })
    }

    catch(e) {
        res.status(500).send({
            apiStatus: false,
        errors: e.message,
        message: "error in deleting"
        })
        
    }
}

//Edit User
static editUser = async(req, res) => {
    try{
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
        
        res.status(200).send({
            apiStatus:true,
            data: user,
            message: "User Updated"
        })
    }

    catch(e) {
        res.status(500).send({
        apiStatus: false,
        errors: e.message,
        message: "error in updating"
        })
        
    }
}

static login = async(req,res)=>{
    try{
        const user = await userModel.login(req.body.email,req.body.password)
        const token = await user.generateToken()
        res.status(200).send({
            apiStatus:true,
            data: {user,token},
            message: "logged in"
        })
    }

    catch(e) {
        res.status(500).send({
        apiStatus: false,
        errors: e.message,
        message: "error in logging"
        })
    }
}

}
module.exports = User