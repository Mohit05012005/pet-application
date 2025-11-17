const express = require('express');
const petRouter =  express.Router();          // it return a middleware.
const userController = require('./../controller/userController');
// route handler function....
const petInfoController = require('./../controller/petInfoController');
const upload = require('./../utils/multer');
petRouter.route('/loginform')
.get(petInfoController.mylimit)

petRouter.route('/')
.post(userController.protect,upload.single("PetImg"),petInfoController.createonepet)
.get(petInfoController.allpetdata)
// .get(userController.protect,petInfoController.allpetdata)

petRouter.route('/request/:id')
.post(userController.protect,petInfoController.requestpet);

petRouter.route('/:id')
.get(petInfoController.getonepet)
.patch(petInfoController.updateonepet)
.delete(userController.protect,userController.restrict('admin'),petInfoController.deleteonepet) // 

module.exports = petRouter;