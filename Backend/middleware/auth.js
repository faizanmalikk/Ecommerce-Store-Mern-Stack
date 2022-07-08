const JWT = require('jsonwebtoken')
const ErrorHander = require('../utils/ErrorHander')
const asyncErrors = require('../middleware/asyncErrors')
const User = require('../models/userModel');

exports.isAuthenticatedUser = asyncErrors( async(req,res,next)=>{
      const {token }= req.cookies;
      if(!token){
          return next( new ErrorHander('Please login to access this resource',401))
      }
     const  decodedData =  JWT.verify(token , process.env.JWT_SECRET)
     req.user = await User.findById(decodedData.id)
     next();
   
})

exports.authorizeUser =  (...roles)=>{
   return (req,res,next)=>{
       if(!roles.includes(req.user.role)){
       return  next(  new ErrorHander(`Role ${req.user.role} is not allowed to access this resource`,403))
       }
       next();
   }
}