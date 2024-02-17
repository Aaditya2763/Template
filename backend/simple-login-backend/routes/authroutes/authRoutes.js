const express=require('express');
const { userRegisterController, userLoginController,isAuthenticated, logoutController } = require('../../controllers/authcontroller/authController');
const authRoutes=express.Router();

//auth route
authRoutes.get('/checkAuthentication',isAuthenticated);
authRoutes.post('/register',userRegisterController);
authRoutes.post('/login',userLoginController);
authRoutes.post('/logout',logoutController)


module.exports=authRoutes