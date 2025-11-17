const express = require('express');
const app = express();
const petRouter = require('./router/petInfoRouter');
const authRouters = require('./router/authRouters');
const userUpdateRouter = require('./router/userUpdateRouter');
const cors = require('cors');
const errorController = require('./controller/errorController');
const customError = require('./utils/customError');
const passport = require("passport");
require("./utils/passport"); // ✅ This only *runs* your strategy setup code
// middleware use
app.use(cors());
app.use(express.json());//  // used to get the data in request object.
app.use("/uploads", express.static("uploads"));
app.use(passport.initialize());
app.use('/auth',authRouters);  // where it is 
app.use('/pets', petRouter);
app.use('/auth',userUpdateRouter);


app.get('/',(req,res)=>{
    res.status(200).json({
        status:"success",
        message:"server is up and running!"
    })
})


app.all('*',function(req,resp,next){  // * means everything
    const err = new customError(`This ${req.originalUrl} url is not found!`,404);
    next(err);
})

app.use(errorController);  // if any middleware throws error it will be handled by this errorController.

//  console.log("here in app");
module.exports = app;