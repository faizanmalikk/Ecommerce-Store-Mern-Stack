const ErrorHander = require('../utils/ErrorHander')
const asyncErrors = require('../middleware/asyncErrors')
const User = require('../models/userModel');
const sendToken = require('../utils/JwtToken');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')
const upload = require('../middleware/multer')

// Register a user
exports.resgisterUser = asyncErrors( async (req, res, next) => {

if(req.body.avatar){
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
          folder : 'Ecommerce',
          width : 150,
          crop:'scale'
      })
      const { name, email, password } = req.body;
        const user = await User.create({
            name, email, password,
            avatar: {
                product_id:  myCloud.public_id,
                url: myCloud.secure_url 
            }
        })

        sendToken(user, 201, res)}
    
     else{
        const { name, email, password } = req.body;
        const user = await User.create({
            name, email, password,
            avatar: {
                product_id: Math.random(),
                url:'https://res.cloudinary.com/doytf8ce3/image/upload/v1655402904/Ecommerce/ebg1xapvqiyukrecfqwe.png' 
            }
        })

        sendToken(user, 201, res)

    }



})


//Login a user
exports.loginUser = asyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //Checking if user has given email and pass both 
    if (!email || !password) {
        return next(new ErrorHander('Please enter email and password', 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHander('Invalid email or password', 401))

    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander('Invalid email or password', 401))

    }


    sendToken(user, 200, res)
})

//Logout User
exports.logout = asyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

//Forgot password
exports.forgotPassword = asyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHander('User not found', 404))
    }

    //Get Reset Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get(
        'host'
    )}/password/reset/${resetToken}`
    
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n\n If you have not requested this email then, please ignore it`

   try {

   await sendEmail({
        email : user.email,
        subject : 'Ecommerce Password Recovery',
        message
    })

    res.status(200).json({
        success : true,
        message : `Email sent to ${user.email} successfully`
    })
       
   } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false })
   next(new ErrorHander(error.message , 500))

   }

})

//Reset Password

exports.resetPassword = asyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256')
    .update(req.params.token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()}
    })

    if(!user){
        return next( new ErrorHander('Reset password token is invalid or has been expired',400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHander('Password does not match',400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user,200,res)

})

//Get logged in user details

exports.getLoggedInUserDetails = asyncErrors( async(req,res,next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success : true,
        user
    })
})

// Get User Details

exports.getUserDetails = asyncErrors( async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    res.status(200).json({
        success : true,
        user
    })
})


//Update user password
exports.updatePassword = asyncErrors( async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password')
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHander('Old password in incorrect', 400))

    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander('Password does not match', 400))
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user,200,res)
})

//Update User
exports.updateUser = asyncErrors( async(req,res,next)=>{

    const newUserData = {
        name : req.body.name,
        email : req.body.email
    }

    if(req.body.avatar){
       
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.product_id
        const url = user.avatar.url
        
        if(url !== 'https://res.cloudinary.com/doytf8ce3/image/upload/v1655402904/Ecommerce/ebg1xapvqiyukrecfqwe.png'){
             await cloudinary.v2.uploader.destroy(imageId)
        }
        
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder : 'Ecommerce',
            width : 350,
            crop:'scale' ,
    })
    newUserData.avatar= {
        product_id:  myCloud.public_id,
        url: myCloud.secure_url 
    }


}
    
    const user = await User.findByIdAndUpdate(req.user.id , newUserData , {
        new : true,
        runValidators : true,
      
    })

    res.status(200).json({
        success : true,
        user
    })
})

//Get all user -- Admin
exports.getAllusers = asyncErrors( async(req,res,next)=>{

    const users = await User.find();

   res.status(200).json({
       success : true,
       users
   })
})


//Get single user -- Admin
exports.getSingleuser = asyncErrors( async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next( new ErrorHander(`User does not exists with this Id:${req.params.id}`))
    }

   res.status(200).json({
       success : true,
       user
   })
})

//Update User Role -- Admin
exports.updateUserRole = asyncErrors( async(req,res,next)=>{

    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id , newUserData , {
        new : true,
        runValidators : true,
      
    })

    if(!user){
        return next(new ErrorHander(`User does exits with id:${req.params.id}`,400))
    }

    res.status(200).json({
        success : true,
        user
    })
})

//Delete User --Admin
exports.deleteUser = asyncErrors( async(req,res,next)=>{
 
const user = await User.findById(req.params.id)

if(!user){
    return next(new ErrorHander(`User does exits with id:${req.params.id}`,400))
}

const imageId = user.avatar.product_id
const url = user.avatar.url

if(url !== 'https://res.cloudinary.com/doytf8ce3/image/upload/v1655402904/Ecommerce/ebg1xapvqiyukrecfqwe.png'){
     await cloudinary.v2.uploader.destroy(imageId)
}

await user.remove();

res.status(200).json({
    success : true,
    message : 'User deleted successfully'
})

})