const mongoose = require("mongoose");
const dotenv=require('dotenv')
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const DB = process.env.MONGODB_URL

const Database=async()=> {
    try {
        await mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
            console.log("Database connected successfully !!");
        }).catch((e) => {
            console.log("Database not connected !!");
        })
    } catch (error) {
        console.log(error);
        
    }
   
}

module.exports=Database

