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
    }
});

const Register = new mongoose.model("values",personSchema);

module.exports = Register; 