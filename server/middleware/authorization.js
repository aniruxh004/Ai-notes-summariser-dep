const { validateToken } = require("../services/authentication")

function checkAuthCookie(cookieName){
    return(req,res,next)=>{
  const tokencookie=req.cookies?.[cookieName]
//   console.log(tokencookie);
  
  if(!tokencookie){
   return res.sendStatus(401)
  }
try {
    const userPayload=validateToken(tokencookie)
    req.user=userPayload
    return next()
} catch (error) {
   return  res.sendStatus(401)
}
  

    }
}

module.exports={
    checkAuthCookie
}