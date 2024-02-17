const expressAsyncHandler = require("express-async-handler");
const User = require("../../modal/user/auth");
const generateToken = require("../../config/tokenConfig");
const jwt=require('jsonwebtoken')
//register controller
const userRegisterController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const userExists = await User.findOne({ email: req?.body?.email });
  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
    // throw new Error("User already exists");
  }

  try {
    const user = await User.create({
      userName: req?.body?.userName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.json(error.message);
  }
});

//Login controller

const userLoginController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;

  //check if user exists
  const userFound = await User.findOneAndUpdate(
    { email },
    { isLoggedIn: true }, // Update operation object
    { new: true } // Option to return the updated document
  );
  //Check if password is match


  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      userName: userFound?.userName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      userName: userFound.firstName,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      address1: userFound.address1,
      address2: userFound.address2,
      isLoggedIn:userFound.isLoggedIn,
      city: userFound.city,
      state: userFound.state,
      zip: userFound.zip,
      country: userFound.country,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      isRegisteredDrivingTest:userFound.isRegisteredDrivingTest,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(400).json({ message: "Invalid password" });
  }
});

//is Authenticated
const isAuthenticated = expressAsyncHandler(async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  //check if user exists 
  const token = authHeader.split(' ')[1];
  //Check if password is match

  try {
    // Your authentication logic here
    const decodeToken=jwt.verify(token,process.env.JWT_KEY)
    if (decodeToken) {
      const { id } = decodeToken;
      const user = await User.findById(id);
      // Extract only the name and image from the user object
      const { firstName, profilePhoto,isRegisteredDrivingTest,isLoggedIn } = user;
      // Create a new object with only the required fields
      const userData = { firstName, profilePhoto,isRegisteredDrivingTest,isLoggedIn };
      res.status(200).json(userData);
    } else {
      res.status(401).json({ message: 'Session expired you need to login again!' });
    }
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  

//logout controller
const logoutController = async (req, res) => {
  const authHeader =  req.headers['authorization'];
  console.log(authHeader)
  // if (!authHeader) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  // //check if user exists 
  // const token = authHeader.split(' ')[1];
  // //Check if password is match
  // try {
  //   const decodeToken = jwt.verify(token, process.env.JWT_KEY);
  //   if (decodeToken) {
  //     const { id } = decodeToken;
  //     const user = await User.findByIdAndUpdate(id, { isLoggedIn: false });

  //     // Create a new object with only the required fields
  //     const userData = { isLoggedIn: user.isLoggedIn };
  //     console.log(userData)
  //     return res.json(userData);
  //   }
  // } catch (error) {
  //   return res.status(500).json({ message: 'Internal Server Error' });
  // }
};

module.exports = {
  userRegisterController,
  userLoginController,
  isAuthenticated,
  logoutController,
};
