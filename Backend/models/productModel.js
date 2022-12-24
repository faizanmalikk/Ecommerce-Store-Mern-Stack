const mongoose = require('mongoose')

const productSchema =new mongoose.Schema({
   name:{
       type : String,
       required : [true , 'Please Enter Product Name'],
       trim : true
   },
   description:{
       type: String,
       required : [true , 'Please Enter Product Description'],

   },
   price:{
       type:Number,
       required : [true , 'Please Enter Product Price'],
       maxlength : [8 , 'Price should not exceeds 8 characters']

   },
   ratings:{
       type : Number,
       default : 0
   },
   images:[
       
       {
           product_id : {
               type : String,
               required : true
           },
           url : {
               type : String,
               required : true
           }
       }
   ],
   category:{
       type:String,
       required : [true , 'Please Enter Product Category'],
   },
   stock:{
       type:Number,
       required : [true , 'Please Enter Product Stock'],
       maxlength : [4 , 'Price should not exceeds 4 characters'],
       default : 1
   },
   numberOfReviews:{
       type:Number,
       default:0
   },
   reviews:[
       { 
        user:{
            type : mongoose.Schema.ObjectId,
            ref : 'User',
            required : true
        },
           name:{
               type:String,
               required : true
           },
           rating:{
               type:Number,
               required:true
           },
           comment:{
               type:String,
               required:true
           }
       }
   ],
   createdAt:{
       type:Date,
       default : Date.now
   },

   user:{
       type : mongoose.Schema.ObjectId,
       ref : 'User',
       required : true
   }

})
module.exports = mongoose.model('Product',productSchema)