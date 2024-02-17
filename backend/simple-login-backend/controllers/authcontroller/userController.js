const expressAsyncHandler = require("express-async-handler");
const User = require("../../modal/user/auth");
const generateToken = require("../../config/tokenConfig");
const cloudnaryUploadImg = require("../../utils/cloudnary");
const fs=require('fs');
//register controller
const drivingtestRegistrationController = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id);
  // console.log(req.body)
  const user=await User.findById(id);

  if (user){
    try {
      // Check if user with the provided ID exist
          // User with the provided ID already exists, so update the user details
          const updatedUser = await User.findByIdAndUpdate(id, {
              userName: req.body.firstName,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              address1: req.body.address1,
              address2: req.body.address2,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip,
              country: req.body.country,
              isRegisteredDrivingTest:true,
          }, { new: true }); // Set { new: true } to return the updated user after update operation
          
          // console.log(updatedUser)
          res.status(200).json(updatedUser);
    
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
  }
  else{
    res.status(500).json({ message: "Something went wrong "});
  }
});

//userProfilrphoto upload
const updateUserProfileAction = expressAsyncHandler(async (req, res) => {
const {id}=req.body;
 const localPath = `public/images/profile/${req.file.filename}`;

    // Upload the image to Cloudinary
    const imgUploaded = await cloudnaryUploadImg(localPath);

    if (!imgUploaded || !imgUploaded.url) {
      return res.status(500).json({ message: 'Image upload to Cloudinary failed.' });
    }
  try {
    // Check if user with the provided ID exists
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { profilePhoto: imgUploaded.url } },
      { new: true } // Return the updated user object
    );
    //removing imgae file  from public folder
    fs.unlinkSync(localPath)
    // Update user's profile photo
    // Assuming photo.buffer contains the binary data of the uploaded image
    
    await updatedUser.save();
    // Save the updated user
   
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Send a success response with the updated user object
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


  module.exports = {
    drivingtestRegistrationController,
    updateUserProfileAction
  };