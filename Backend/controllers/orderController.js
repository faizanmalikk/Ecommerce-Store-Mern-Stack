const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHander = require('../utils/ErrorHander')
const asyncErrors = require('../middleware/asyncErrors')

//Creating a order
exports.createOrder = asyncErrors(async(req,res,next)=>{

    const{shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        paymentInfo,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user : req.user._id
    })

    res.status(201).json({
        success: true,
        order
    })

})

//Get order Details
exports.getOrderDetails = asyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if(!order){
        return next(new ErrorHander("Order not found with this id",404))
    }

    res.status(200).json({
        success : true,
        order
    })
})



//Get logged In user orders
exports.myOrders = asyncErrors(async(req,res,next)=>{

    const orders = await Order.find({user: req.user._id})


    res.status(200).json({
        success : true,
        orders
    })
})

//Get all orders
exports.getAllOrders = asyncErrors(async(req,res,next)=>{

    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    }) 

    res.status(200).json({
        success:true,
        orders,
        totalAmount
    })
})


//Update Order Status

exports.updateOrderStatus = asyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id);

if(!order){
return next(new ErrorHander('Order does not exists with this id',404))
}

if(order.orderStatus === 'delivered'){
    return next(new ErrorHander('You have already delivered this order',400))
}

if(req.body.status === 'shipped'){
    order.orderItems.forEach(async(o)=>{
        await updateStock(o.product,o.quantity);
 })
}

order.orderStatus = req.body.status

if(req.body.status === 'delivered'){
    order.deliveredAt = Date.now();
}

await order.save({validateBeforeSave : false});

    res.status(200).json({
        success:true
        
    
    })
})

async function updateStock (id,quantity){

    const product = await Product.findById(id);
    product.stock -= quantity;
  await  product.save({validateBeforeSave : false})

}

//Delete Order
exports.deleteOrder = asyncErrors( async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHander('Order does not found with this id',404))
    }
   

    await order.remove();

    res.status(200).json({
        success : true,
        message : 'Order has been deleted'
    }) 
})
