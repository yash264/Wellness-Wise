
const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    step_goal: { type: Number, required: true },
    hydration_goal: { type: Number, required: true },
    sleep_goal: { type: Number, required: true },
    streak: { type: Number, default: 0 },
    lastLogDate: { type: Date, default: null },
}, { timestamps: true });

const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;
