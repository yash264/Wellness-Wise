const mongoose = require("mongoose");
const DB = 'mongodb+srv://yp5094280:h6jEx0Brauuank3R@practise.btsrssx.mongodb.net/healthRecord';

mongoose.connect(DB).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log("No Connection");
})