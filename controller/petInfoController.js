const apifeatures = require('./../utils/apifeatures');
const pet_model = require('./../models/petschema');
const customError = require('./../utils/customError');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');
 const user_model = require('./../models/userschema');
 const sendEmail = require('./../utils/email');
//  const kee = new customError("hii",400)
// console.log(kee.isOperational);


exports.allpetdata = asyncErrorHandler(async (req, res, next) => {
  // Apply filtering, sorting, field limiting, and pagination
  const features = new apifeatures(pet_model.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  // Execute query
  const pets = await features.query;

  // If no pets found
  if (!pets || pets.length === 0) {
    return next(new customError("No pets found!", 404));
  }

  // Send successful response
  res.status(200).json({
    status: "success",
    results: pets.length,
    data: pets,
  });
});


exports.createonepet = asyncErrorHandler(async(req,resp)=>{
        let data = req.body;
        data.mailAddress = req.user.email;
        data.OwnerName = req.user.name;
        data.PetImg = `uploads/${req.file.filename}`;
        data.PetAge = Number(data.PetAge);
        data.PhoneNumber = Number(data.PhoneNumber);
        const createpet = await pet_model.create(data);
           resp.status(201).json({
              status: 'success',
              createpet
           }) 
})

exports.getonepet = asyncErrorHandler(async(req,resp,next)=>{
        const {id} = req.params;
       const value =  await pet_model.findById(id);
       if(!value){
          const error = new customError('this Id document is not found!',404);
          console.log(error);
          return next(error);
       }
        resp.status(200).json({
           status: "success",
           data: {
             value
           }
        })
})

exports.updateonepet = asyncErrorHandler(async(req,resp,next)=>{
    
          const {id} = req.params;
       const updatedPetInfo = await pet_model.findByIdAndUpdate(id,req.body,{new: true,runValidators: true});
       if(!updatedPetInfo){
          const err = new customError('this Id document is not found!',404);
          return next(err);
       }
       
       resp.status(200).json({
            status: "success",
            updated_record: {
                updatedPetInfo
            }
         }) 
})

exports.deleteonepet = asyncErrorHandler(async(req,resp,next)=>{
        const id = req.params.id;
     const deleteDoc = await pet_model.findByIdAndDelete(id);
     if(!deleteDoc){
        const err = new customError('this Id document is not found!',404);
        next(err);
       }
     resp.status(200).json({
        status: "success",
        deleted_record: {
            deleteDoc
        }
     }) 
})
// I don't know why this is : 
exports.mylimit = async(req,resp)=>{
    const excludeFields  = ['sort','page','limit','fields'];
    const queryObj = {...req.query};     //shallow copy
    excludeFields.forEach((el)=>{
        delete queryObj[el];
    })
    queryObj.name = "mohit";
    console.log(req.query);
    console.log(queryObj);
   const data = req.query;
 const movie = await pet_model.find(data); 
 resp.status(200).json({
    movie
 })

}

exports.requestpet = asyncErrorHandler(async(req,resp,next)=>{
   const senderuser = req.user;
   const userId = req.params.id;
           const pet =  await pet_model.findById(userId);
           if(!pet){
            return  resp.status(404).json({
               status:"fail",
               message:"pet not found"
            })
           }
           const user = await user_model.findOne({email:pet.mailAddress})

           if(!user){
           return   resp.status(404).json({
               status:"fail",
               message:"user not found"
            })
           }

         sendEmail({
            email:user.email,
            subject:"Pet Request",
            text:`Hello ${user.name},\n
            ${senderuser.name} has requested a pet from you.\n
            Please get in touch with them to proceed further. \n
            Contact details:\n
            Email:${senderuser.email}\n
            Phone:${senderuser.phone}\n
            Thank you!\n
            `
         })
         resp.status(200).json({
            status:"success",
            message:"Request email sent successfully"
         })
})

exports.manypets = asyncErrorHandler(async(req,resp,next)=>{
   const data = req.body;
   console.log(data);
   for(let i = 0;i<data.length;i++){
      await pet_model.create(data[i]);
   }
   resp.status(201).json({
      status:"success",
      messsage: "all the pet are inserted"
   })
})
