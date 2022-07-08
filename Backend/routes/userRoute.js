const express = require('express');
const router = express.Router();
const { isAuthenticatedUser , authorizeUser} = require('../middleware/auth');
const { resgisterUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUser, getAllusers, getSingleuser, updateUserRole, deleteUser, getLoggedInUserDetails } = require('../controllers/userController');


router.route('/register').post(resgisterUser)

router.route('/login').post(loginUser)

router.route('/logout').get(logout)

router.route("/password/reset/:token").put(resetPassword);

router.route('/password/forgot').post(forgotPassword)

router.route('/me').get( isAuthenticatedUser, getLoggedInUserDetails)

router.route('/user/:id').get(getUserDetails)

router.route('/password/update').put( isAuthenticatedUser, updatePassword)

router.route('/me/update').put( isAuthenticatedUser, updateUser)

router.route('/admin/users').get( isAuthenticatedUser, authorizeUser('admin') ,getAllusers)

router.route('/admin/user/:id').get( isAuthenticatedUser, authorizeUser('admin') ,getSingleuser)
.put(isAuthenticatedUser, authorizeUser('admin'),updateUserRole).delete(isAuthenticatedUser, authorizeUser('admin'),deleteUser)





module.exports = router