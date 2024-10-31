const mongoose = require("mongoose");

const Analysis_Schema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    sleep_analysis:{
        type:[String],
    },
    mood_analysis: [{
        type: String,
    }],
    activity_analysis: {
        type: String,
    },
    meal_recommendation: [{
        meal: {
            type: String, 
            required: true
        },
        calories: {
            type: Number,
            required: true
        },
        protein: {
            type: Number,
            required: true
        }
    }],
    date:{
        type: Date,
        default: Date.now
    }
    
}, { timestamps: true });


const Analysis = mongoose.model("analysis", Analysis_Schema);

module.exports = Analysis;
