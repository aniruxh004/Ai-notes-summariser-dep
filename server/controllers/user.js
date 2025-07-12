const User = require("../models/user")

const signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        await User.create({
            name: name,
            email: email,
            password: password
        })

        return res.status(201).json({ message: "signup done" })
    } catch (error) {
        return res.status(500).json({ error: 'signup failed' })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await User.matchPasswordandGenerateToken(email, password)
        res.cookie("token", token, {
            httpOnly: true,
            secure:true,
            sameSite:'None'       
                });
        return res.status(200).json({ message: 'login succcess' })
    } catch (error) {
        return res.status(401).json({ message: 'login failed' })
    }
}


const verifyUser = (req, res) => {
    if (req.user) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

const logout=(req,res)=>{
 res.clearCookie('token',{
    httpOnly:true,
    sameSite:'Lax',
    secure:false
 })
 res.json({message:'logout successfull'})
}


module.exports = {
    signup,
    login,
    verifyUser,
    logout
};
