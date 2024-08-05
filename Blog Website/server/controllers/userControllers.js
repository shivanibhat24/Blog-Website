const User=require('../models/userModel');
const HttpError=require('../models/errorModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const fs=require('fs');
const path=require('path');
const {v4:uuid}=require('uuid');

const registerUser=async(req,res,next)=>{
    try {
        const {name,email,password,password2}=req.body;
        if(!name ||!email||!password){
            return next(new HttpError("Fill in all fields",422));
        }
        const newEmail=email.toLowerCase();
        const emailExists=await User.findOne({email:newEmail});
        if(emailExists){
            return next(new HttpError("Email already exists",422));
        }
        if((password.trim())<6){
            return next(new HttpError("Password should consist of atleast 6 characters",422));
        }
        if(password!=password2){
            return next(new HttpError("Passwords do not match",422));
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(password,salt);
        const newUser=await User.create({name,email:newEmail,password:hashedPass});
        res.status(201).json(`New user ${newUser.email} created:Welcome to the Website!`);
    } catch (error) {
        return next(new HTTPError("User Registration Failed",422));
    }
}
const loginUser=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return next(new HTTPError("Fill in all Fields",422));
        }
        const newEmail=toLowerCase();
        const user= await User.findOne({email:newEmail});
        if(!user) {
            return next(new HTTPError("Invalid credentials.",422));
        }
        const comparePass= await bcrypt.compare(password,user.password);
        if(!comparePass){
            return next(new HTTPError("Invalid credentials.",422));
        }
        const {_id:id,name}=user;
        const token=jwt.sign({id,name},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({token,id,name});
    } catch (error) {
        return next(new HTTPError("Login Failed. Please check your credentials.",422));
    }
}
const getUser=async(req,res,next)=>{
   try {
     const {id}=req.params;
     const user=await User.findById(id).select('-password');
     if(!user){
        return next(new HTTPError("User not found",422));
     }
     res.status(200).json(user);
   } catch (error) {
    return next(new HTTPError(error));
   }
}
const changeAvatar=async(req,res,next)=>{
    try {
        if(!req.files.avatar){
            return next(new HTTPError("Please choose an Image",422));
        }
        const user=await User.findById(req.user.id);
        if(user.avatar){
            fs.unlink(path.join(__dirname,'..','uploads',user.avatar),(err)=>{
                return next(new HTTPError(error));
            })
        }
        const {avatar}=req.files;
        if(avatar.size>500000){
            return next(new HTTPError("Profile picture too big. Should be less than 500kb"),422);
        }
        let fileName;
        fileName=avatar.name;
        let splittedFileName=fileName.split('.');
        let newFileName=splittedFileName[0]+uuid()+'.'+splittedFileName[splittedFileName.length-1];
        avatar.mv(path.join(--dirname,'..','uploads',newFileName),async(err)=>{
            if(err){
                return next(new HTTPError(error));
            }
            const updatedAvatar=await User.findByIdAndUpdate(req.user.id,{avatar:newFileName},{new:true});
            if(!updatedAvatar){
                return next(new HTTPError("Avatar couldn't be changed."),422);
            }
            res.status(200).json(updatedAvatar);
        })
    } catch (error) {
        return next(new HTTPError(error));
    }
}
const editUser=async(req,res,next)=>{
   try {
     const {name,email,currentpassword,newPassword,confirmPassword}=req.body;
     if(!name||!email||!currentpassword||!newPassword||!confirmPassword){
        return next(new HTTPError("Fill in all fields"),422);
     }
     const user=await User.findById(req.user.id);
     if(!user){
        return next(new HTTPError("User not Found"),403);
     }
     const emailExists=await User.findOne({email});
     if(emailExists && (emailExists._id!=req.user.id)){
        return next(new HTTPError("Email already exists"),422);
     }
     const validateuserPassword=await bcrypt.compare(currentpassword,user.password);
     if(!validateuserPassword){
        return next(new HTTPError("Invalid Password"),404);
     }
     if(newPassword!=confirmPassword){
        return next(new HTTPError("Passwords do not match"),422);
     }
     const salt=await bcrypt.genSalt(10);
     const Hash=await bcrypt.hash(newPassword,salt);
     const newInfo=await User.findByIdAndUpdate(req.user.id,{name,email,password:hash},{new:true});
     res.status(200).json(newInfo);
   } catch (error) {
    return next(new HTTPError(error));
   }
}
const getAuthors=async(req,res,next)=>{
    try {
        const authors=await User.find().select('-password');
        res.json(authors);
    } catch (error) {
        return next(new HTTPError(error));
    }
}
module.exports={registerUser,loginUser,getUser,changeAvatar,editUser,getAuthors}