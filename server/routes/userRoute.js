const express=require("express")
const {signup,login, verifyUser,logout}=require("../controllers/user");
const { checkAuthCookie } = require("../middleware/authorization");
const router=express.Router()

router.get('/verify', checkAuthCookie("token"), verifyUser);

router.post("/signup",signup) 

router.post("/login",login)


router.post("/logout",logout)

module.exports=router



