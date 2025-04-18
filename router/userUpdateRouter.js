const express = require('express');
const userUpdateController = require('./../controller/userUpdateController');
const userUpdateRouter = express.Router();
const userController = require('./../controller/userController');



userUpdateRouter.route('/update-password/')
.patch(userController.protect,userUpdateController.updatePassword);


userUpdateRouter.route('/updateMe/',userUpdateController.updateMe);

module.exports = userUpdateRouter;