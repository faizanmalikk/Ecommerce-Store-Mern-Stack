const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name:{
      type : String,
      required : [true, 'Please enter your name'],
      maxlength : [30 , 'Name should not exceeds 30 characters'],
      minlength : [4 , 'Name should be greater then 4 characters']
  },
email:{
    type:String,
    required: [true,'Please enter your email address'],
    validate: [validator.isEmail , 'Please enter a valid email'],
    unique: true
},
password:{
    type: String,
    required: [true, 'Please enter your password'],
    minlength : [8 , 'Your password should be greater then 8 characters'],
    select : false
},
avatar:   {
    product_id : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    }
},
role:{
    type: String,
    default : 'user'
},
createdAt :{
    type : Date,
    default : Date.now
},

resetPasswordToken:String,
resetPasswordExpire : Date

})

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
      next();
  }
  this.password = await bcrypt.hash(this.password,10)
})

//JWT Token
userSchema.methods.getJwtToken = function(){
    return JWT.sign({id : this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE
    })
}

//Compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

//Generating reset password token
userSchema.methods.getResetPasswordToken = function(){

    //Generating token
    const resetToken = crypto.randomBytes(20).toString('hex')

    //Hashing and saving resetToken in userSchema

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest("hex")
   this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}


module.exports = mongoose.model('User',userSchema)