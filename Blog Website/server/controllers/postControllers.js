const Post=require('../models/postModel');
const User=require('../models/userModel');
const path=require('path');
const fs=require('fs');
const {v4:uuid}=require('uuid');
const HTTPError=require('../models/errorModel');

const getPosts=async(req,res,next)=>{
    try {
        const posts=await Post.find().sort({updatedAt:-1});
        res.status(200).json(posts)
    } catch (error) {
        return next(new HTTPError(error));
    }
}
const getUserPosts=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const posts=await Post.find({creator:id}).sort({createdAt:-1});
        res.status(200).json(posts);
    } catch (error) {
        return next(new HTTPError(error));
    }
}
const getPost=async(req,res,next)=>{
    try {
        const postId=req.params.id;
        const post=await Post.findById(postId);
        if(!post){
            return next(new HTTPError("Post Not Found"),404);
        }
        res.status(200).json(post);
    } catch (error) {
        return next(new HTTPError(error));
    }
}
const getCatPost=async(req,res,next)=>{
    try {
        const {category}=req.params;
        const catPosts= await Post.find({category}).sort({createdAt:-1});
        res.status(200).json(catPosts);
    } catch (error) {
        return next(new HTTPError(error));
    }
}
const createPost=async(req,res,next)=>{
    try {
        let {title,category,description}=req.body;
        if(!title||!category||!description||!req.files){
            return next(new HTTPError("Fill in all fields and choose thumbnail"),422);
        }
        const {thumbnail}=req.files;
        if (thumbnail.size>2000000){
            return next(new HTTPError("Thumbnail is too big. Upload a file less than 2mb"));
        }
        let fileName=thumbnail.name;
        let splittedFileName=fileName.split('.');
        let NewFileName=splittedFileName[0]+uuid()+"."+splittedFileName[splittedFileName.length-1];
        thumbnail.mv(path.join(__dirname+'..'+'/uploads',NewFileName),async(err)=>{
            if(err){
                return next(new HTTPError(err));
            }else{
                const newPost=await Post.create({title,category,description,thumbnail:NewFileName,creator:req.user.id});
                if(!newPost){
                    return next(new HTTPError("Could not create post", 422));
                }
                const currentUser=await User.findById(req.user.id);
                const userPostCount=currentUser.posts+1;
                await User.findByIdAndUpdate(req.user.id,{posts:userPostCount});
                res.status(201).json(newPost);
            }
        })
    } catch (error) {
        return next(new HTTPError(error));
    }
}
const editPost=async(req,res,next)=>{
    try {
        let fileName;
        let newFileName;
        let updatedPost;
        let {title,category,description}=req.body;
        if(!title||!category||!description.length<12){
            return next(new HTTPError("Fill in all fields."),422);
        }
        if(!req.files){
            updatedPost=await Post.findByIdAndUpdate(postId,{title,category,description},{new:true})
        }else{
            const oldPost=await Post.findById(postId);
            fs.unlink(path.join(__dirname,'..','/uploads',oldPost.thumbnail),async(err)=>{
                if(err){
                    return next(new HTTPError(err));
                }
                const {thumbnail}=req.files;
                if(thumbnail.size>200000){
                    return next(new HTTPError("Thumbnail is too big.File should be less than 2mb"));
                }
                fileName=thumbnail.name;
                let splittedFileName=splittedFileName[0]+uuid()+"."+splittedFileName[splittedFileName.length-1];
                thumbnail.mv(path.join(__dirname+'..'+'/uploads',NewFileName),async(err)=>{
            if(err){
                return next(new HTTPError(err));
            }else{
                const newPost=await Post.create({title,category,description,thumbnail:NewFileName,creator:req.user.id});
                if(!newPost){
                    return next(new HTTPError("Could not create post", 422));
                }
                const currentUser=await User.findById(req.user.id);
                const userPostCount=currentUser.posts+1;
                await User.findByIdAndUpdate(req.user.id,{posts:userPostCount});
                res.status(201).json(newPost);
            }
        })
                if(err){
                    return next(new HTTPError(err));
                }else{
                    updatedPost= await Post.findByIdAndUpdate(postId,{title,category,description,thumbnail:newFileName},{new:true});
                }
                if(!updatedPost){
                    return next(new HTTPError("Could not Update Post"),422);
                }
                res.status(200).json(updatedPost);
            })
        }
    } catch (error) {
        return next(new HTTPError(error));
    }
}
const deletePost=async(req,res,next)=>{
    try {
        const postId=req.params.id;
        if(!postId){
            return next(new HTTPError("Post Unavailable",400));
        }
        const post= await Post.findById(postId);
        const fileName=post?.thumbnail;
        fs.unlink(path.join(__dirname,'..','./uploads',fileName),async(err)=>{
            if(err){
                return next(new HTTPError(err));
            }else{
                await Post.findByIdAndDelete(postId);
                const currentUser=await User.findById(req.user.id);
                const userPostCount=currentUser?.posts-1;
                await User.findByIdAndUpdate(req.user.id,{posts:userPostCount});
            }
        })
        res.status(200).json(`Post ${postId} deleted successfully.`);
    } catch (error) {
        return next(new HTTPError(error));
    }
}
module.exports={createPost,editPost,deletePost,getPosts,getUserPosts,getPost,getCatPost,removeEventListener};