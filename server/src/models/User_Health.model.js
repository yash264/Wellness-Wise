const mongoose = require("mongoose");

const user_Health_Schema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    activity: {
        type: Number,
        required: true
    },
    nutrition: {
        type: Number,
        required: true
    },
    sleep: {
        type: Number,
        required: true
    },
    sleep_quality: {
        enum:[ "good", "fair", "poor"],
        type: String,
        required: true
    },
    Scrren_time_minutes: {
        type: Number,
        required: true
    },
    Caffine_intake: {
        enum:["high","low","medium"],
        type: String,
        required: true
    },
    mood:{
        type:String,
        required: true
    },
    Stress_level:{
        type:Number,
        required: true
    },
    diet:{
        enum:["vegetarian","vegan","non-vegetarian","gluten-free"],
        type:String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

});


const Health = mongoose.model("health", user_Health_Schema);

module.exports = Health;
