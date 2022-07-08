const express = require('express');
const { getAllproducts , createProduct, updateProduct , deleteProduct, productDetails, createReviews , getAllReviews, deleteReview, getAllproductsAdmin, getAllproductsForcart} = require('../controllers/productController');
const { isAuthenticatedUser , authorizeUser} = require('../middleware/auth');
const router = express.Router();

router.route('/products').get(getAllproducts)

router.route('/products/all').get(getAllproductsForcart)

router.route('/admin/products').get(isAuthenticatedUser , authorizeUser('admin'),getAllproductsAdmin)

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeUser('admin'),createProduct)

router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeUser('admin'),updateProduct)
.delete(isAuthenticatedUser, authorizeUser('admin'),deleteProduct)

router.route('/product/:id').get(productDetails)

router.route('/review').put(isAuthenticatedUser , createReviews)

router.route('/reviews').get(getAllReviews).delete(isAuthenticatedUser,deleteReview)

module.exports = router;