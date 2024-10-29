const mongoose = require("mongoose");
const dotenv=require('dotenv')
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const DB = process.env.MONGODB_URL || 'mongodb+srv://yp5094280:h6jEx0Brauuank3R@practise.btsrssx.mongodb.net/healthRecord';

mongoose.connect(DB).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log("No Connection");
})