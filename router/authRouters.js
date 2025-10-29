const express = require('express');
const userController = require('./../controller/userController');
const authRouters = express.Router();       // here we have created a new resource router.

// user signup,
authRouters.route('/signup')
.get(userController.protect,userController.getdata)
.post(userController.signUp)
.delete(userController.protect,userController.deletedData);

authRouters.route('/login')
.post(userController.logIn);

authRouters.route('/me')
.get(userController.protect,userController.getMe);
authRouters.route('/:id')    // why this??
.delete(userController.protect,userController.deleteDataById);

authRouters.route('/mail')
.get(userController.protect,userController.getPetsByMail);

authRouters.route('/forget-password')
.post(userController.protect,userController.forgetPassword);

authRouters.route('/reset-Password/:token')
.patch(userController.protect,userController.resetPassword);



module.exports = authRouters;