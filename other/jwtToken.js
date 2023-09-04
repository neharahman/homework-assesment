const jwt = require('jsonwebtoken');
require('dotenv').config()


module.exports.createToken=async (obj)=>{
    try{
        console.log('inside jwtToken',obj)
        let token=await jwt.sign({obj},process.env.JWT_SECRET,{expiresIn:'1d'})
        return token
    }catch(err){
        console.log(err)
        throw err
    }
}

module.exports.verifyToken=async (obj)=>{
  try {
    let decoded=await jwt.verify(obj,process.env.JWT_SECRET)
    console.log('token verify successfully')
    return decoded
  } catch(err) {
    console.log('something went wrong during token verify',err)
    throw err
  }
}