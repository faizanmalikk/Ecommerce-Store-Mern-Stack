const express = require('express');
const { createOrder, getOrderDetails, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const router = express.Router();
const { isAuthenticatedUser , authorizeUser} = require('../middleware/auth');


router.route('/order/new').post(isAuthenticatedUser,createOrder)

router.route('/order/:id').get(isAuthenticatedUser,getOrderDetails)

router.route('/orders/me').get(isAuthenticatedUser,myOrders)

router.route('/admin/orders').get(isAuthenticatedUser,authorizeUser('admin'),getAllOrders)

router.route('/admin/order/:id').put(isAuthenticatedUser,authorizeUser('admin'),updateOrderStatus)
.delete(isAuthenticatedUser,deleteOrder)


module.exports = router