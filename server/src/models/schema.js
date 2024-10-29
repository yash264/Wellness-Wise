const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    type:{
        type:String
    },
    name:{
        type:String
    },
    gender:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    activity:{
        type:Number
    },
    sleep:{
        type:Number
    },
    nutrition:{
        type:Number
    }
});

const Register = new mongoose.model("values",personSchema);

module.exports = Register; 