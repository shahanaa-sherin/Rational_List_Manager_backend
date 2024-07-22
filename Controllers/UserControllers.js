const userModel = require('../Models/UserSchema');
const User = require('../Models/UserSchema')
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

const UserObj = {
    login :async (req,res)=>{
        const {email,password} = req.body;
        const existingUser = await User.findOne({email:email});
        if(!existingUser){
            return res.status(400).json({ error: "user not found" });
        }
        const isMatch = await bcrypt.compare(password,existingUser.password);
        if(!isMatch){
            return res.status(400).json({ error: "invalid Password" });
        }
        const token = Jwt.sign({id:existingUser._id},process.env.SECRET_KEY,{expiresIn:'1h'})
        return res.status(200).json({ success: "user login successfully", token: token });
    },
    signup:async (req,res)=>{
        const { userName, email, password } = req.body;
        console.log(userName, email, password)
       const existingUser = await User.findOne({email:email});
       if(existingUser){
         return res.status(400).json({ error: "user already exist.please login" });
       }
       const hashedpassword = await bcrypt.hash(password,10)
       const newUser = await new userModel({
        userName:userName,
        email:email,
        password:hashedpassword
       })
       newUser.save();
       const token = Jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn:'1h'})
       return res.status(200).json({ success: "user created successfully", token: token });
    }
    
}

module.exports = UserObj;