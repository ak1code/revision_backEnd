const express=require("express");
// const UserModel =require("../Model/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { UserModel } = require("../Model/userModel");

const userRoute=express.Router();

userRoute.post("/signup",async(req,res)=>{
    // email:String,
    // password:String
     const {email,password}=req.body;

     try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(400).send({"msg":err.message})
            }else{
                const user=new UserModel({email,password:hash});
                await user.save();
                res.status(200).send({"msg":"new user registed successful"})
            }
        })
     } catch (error) {
           res.status(400).send({"msg":error.message})
     }
})


userRoute.post("/login",async(req,res)=>{
     const {email,password}=req.body;
       try {
        const user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                  if(result){
                    const token=jwt.sign({userID:user._id},"masai");
                    res.status(200).send({"msg":"login successful",token})
                  }else{
                    res.send(400).send({"msg":err.message})
                  }
            })
         }
       } catch (error) {
            res.send(400).send({"msg":err.message})
       }
   
})

module.exports=userRoute;