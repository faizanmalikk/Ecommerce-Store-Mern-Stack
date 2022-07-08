const express = require('express');
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/payment/process').post(processPayment)

router.route('/stripeApiKey').get(sendStripeApiKey)


module.exports = router