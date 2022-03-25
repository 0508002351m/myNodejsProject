const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 15
    },
    age:{
        type: Number,
        default: 15,
        maxlength: 80,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error ("Invalid Email")
        }
    },
    password: {
        type: String,
        trime: true,
        required: true,
        minlength: 5,
        validate(value) {
            if(value.includes(this.name)) throw  new Error ("Password Can't Contain Your Name")
        }
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error ("Incorrect Phone Number")

        }
    },
    gender: {
        type: String,
        required: true,
        enum: ["female", "male"]
    },
    tokens: [{
        token: {
            type: String,
        }
    }],

    image: {
        type: String,
        trim: true
    }

}, 

    {timestamps: true})


userSchema.methods.toJSON = function() {
    const user = this.toObject()
    delete user.password,
    delete user.__v
    return user

}

userSchema.pre("save", async function() {
    const user = this
    if(user.isModified("password")) 
    user.password = await bcrypt.hash(user.password, 10)
})

userSchema.statics.login=async(email,password)=>{
        const user = await User.findOne({email:email})
        if(!user) throw new Error("Invalid email")
        const matched = await bcrypt.compare(password,user.password)
        if(!matched) throw new Error("Invalid password")
        return user
}

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id},"project")
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model("User", userSchema)

module.exports = User