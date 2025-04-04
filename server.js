const mongoose = require('mongoose');

// exception handling ...
process.on('uncaughtException',(err)=>{
    console.log("Uncaught Exception occured. Shutting down.......");
    process.exit(1);
});

const dotenv = require('dotenv');
const path = require('path');
const app = require('./app')
// console.log(path.dirname);
dotenv.config({path: "./config.env"});

const { log } = require('console');


// database connection .....
mongoose.connect('mongodb://localhost:27017/mypets').then((err)=>{
    console.log("connected to database.");
})
.catch((err)=>{
  console.log("error in connection with database!")
})


let port = process.env.PORT || 9000;

// server connection and running .....
const server = app.listen(port,()=>{      // it will return a server object.
    console.log("server is running at :","http://localhost:9000/");
})


// Listens for unhandledRejection event. and closing the server using server.close().....
process.on('unhandledRejection',(err)=>{
  console.log(err.name);
  server.close(()=>{
    process.exit(1);       // if 0 then successful if 1 then unhandled rejection.
  })
})
 
