const {Schema,model}=require('mongoose');

const postSchema=new Schema({
    title:{type:String,required:true},
    category:{type:String,enum:["Agriculture","Business","Education","Entertainment","Investment","Art","Uncategorized","Weather"],message:"Value is not supported"},
    description:{type:Schema.Types.ObjectId,ref:"User"},
    creator:{type:String,required:true},
    thumbnail:{type:String,required:true},
},{timestamps:true})

module.exports=model("Post",postSchema);