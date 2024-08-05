const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const userRoutes=require('./routes/userRoutes');
const postRoutes=require('./routes/postRoutes');
const {notFound,errorHandler}=require('./middleware/errorMiddleware');
const app=express();
const upload=require('express-fileupload');
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials:true, origin:"https://localhost:3000"}));
app.use(upload());
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.use(notFound);
app.use(errorHandler);

const dotenv = require("dotenv");  //require dotenv package
dotenv.config({ path: "./config.env" }); //import config.env file

const DB = process.env.MONGO_URI;  
const Port = process.env.PORT;

mongoose
  .connect(DB)
  .then(() => {
    console.log(`Successfully connected to port ${Port}`);
  })
  .catch((error) => {
    console.log(`Cannot connect to database, ${error}`);
  });