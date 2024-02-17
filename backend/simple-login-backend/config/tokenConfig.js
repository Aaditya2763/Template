const jwt=require('jsonwebtoken')
const crypto=require('crypto')

//creating random key
const JWT_KEY = process.env.JWT_KEY;


//generating token
const generateToken=id=>{
     return jwt.sign({id},JWT_KEY,{expiresIn:"10d"} )
}

module.exports=generateToken;




const registerHandler = async (e) => {
     e.preventDefault();
 
   
     useEffect(async() => {
          const user = {
               userName: userName,
               email: email,
               password: password,
             };
             try {
               await dispatch(registerUserAction(user));
               
             } catch (error) {
               // Handle unexpected errors
               toast.error('An unexpected error occurred');
             
             }
     
       return () => {
         if(appErr){
          toast.error("bsdjbj")
         }
       }
     }, [dispatch])
}
     
   
     
    