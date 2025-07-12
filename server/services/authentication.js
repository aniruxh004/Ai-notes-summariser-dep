const jwt=require('jsonwebtoken')
const secretkey='$uperman444'

function createToken(user){
 const payload={
    _id:user._id,
    name:user.name,
    email:user.email
 }
 const token= jwt.sign(payload,secretkey)

 return token;
}

function validateToken(Token){
if(typeof Token !== 'string'){
    throw new Error(" token must be of string type")
}
const payload=jwt.verify(Token,secretkey)
return payload;
}

module.exports={
    createToken,
    validateToken
}