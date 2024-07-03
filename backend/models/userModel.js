const mongoose=require("mongoose");
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxlength:[30,"Name cannot exceed 30 characters"],
        minlength:[4,"Name should have more than 4 characters"],
    },
    email:{
        type:String,
        required:[true,"Please enter a valid email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"],
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minlength:[8,"Password should be greater than 8 characters"],
        select:false
    },
 
    role:{
        type:String,
       
    },
    resetPasswordToken:String,
    resetPasswordToken:Date,
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password= await bcrypt.hash(this.password,10)
})

//JWT TOKEN

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

//Compare Password
userSchema.methods.comparePassword=async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
}




module.exports=mongoose.model("User",userSchema)