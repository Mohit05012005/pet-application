multer = require('multer');
const path = require('path');

// set storage
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

// upload parameters
const upload = multer({storage});
module.exports = upload;