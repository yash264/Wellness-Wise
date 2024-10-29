const mongoose = require("mongoose");
const dotenv=require('dotenv')
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const DB = process.env.MONGODB_URL;

mongoose.connect(DB).then(()=>{
    console.log("Database connected successfully !!");
}).catch((e)=>{
    console.log("Database not connected !!");
})