const express=require('express');
const { drivingtestRegistrationController, updateUserProfileAction } = require('../../controllers/authcontroller/userController');
const { userProfileUpload, profilePhotoResize } = require('../../middleware/upload/upload');
const userRoutes=express.Router();

// user Routes//
userRoutes.post('/test-registration',drivingtestRegistrationController);
userRoutes.put('/update-profile-photo',userProfileUpload.single('image'),profilePhotoResize,updateUserProfileAction);
// userRoutes.post('/logout',logoutController) ;


module.exports=userRoutes;