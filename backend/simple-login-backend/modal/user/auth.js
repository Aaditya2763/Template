const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Define the User schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  firstName: {
    type: String,
    
  },
  lastName: {
    type: String,
    
  },
  address1: String,
  address2: String,
  city: {
    type: String,
    
  },
  state: String,
  zip: String,
  country: {
    type: String,
    
  },
  profilePhoto: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=",
  },
  email: {
    type: String,
    
  
  },
  password: {
    type: String,
    
  },
  isLoggedIn:{
    type:Boolean,
    default:false,
  },
  gender: {
    type: String,
  },
  isRegisteredDrivingTest:{
type:Boolean,
  },
  token: {
    type: String,
  },
  // You can add more fields as needed (e.g., firstName, lastName, etc.)
});
// Exclude the password field from toJSON transform i.e response not will able to send the password field
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Custom method to compare entered password with hashed password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
