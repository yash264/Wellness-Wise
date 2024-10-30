const mongoose = require("mongoose");

const GoalGoalSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    sleep_goal: {
        type: Number,
        required: true
    },
    hydration_goal: {
        type: Number,
        required: true
    },
    step_goal: {
        type: Number,
        required: true
    },
    streak:{    
        type: Number,
        default: 0,
    },

});


const Goal = mongoose.model("GoalGoal", GoalGoalSchema);

module.exports = Goal;
