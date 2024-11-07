const Goal = require("../models/HealthGoal.model");


// Set a new goal for the user
const setGoal = async (req, res) => {
    const { stepGoal, hydrationGoal, sleepGoal } = req.body;
    const userID = req.user.id;

    
    try {
        const newGoal = new Goal({
            userID,
            step_goal: stepGoal,
            hydration_goal: hydrationGoal,
            sleep_goal: sleepGoal,
            streak: 0,
            lastLogDate: null
        });

        await newGoal.save();
        res.status(201).json({ message: "Goal set successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to set goal" });
    }
};

// Log daily progress and update streak if goals are met
const logProgress = async (req, res) => {
    const { stepsCompleted, hydrationCompleted, sleepCompleted } = req.body;
    const userID = req.user.id;
    const today = new Date().setHours(0, 0, 0, 0); // Set time to midnight for date comparison

    try {
        const goal = await Goal.findOne({ userID }).sort({ _id: -1 });

        if (!goal) {
            return res.status(404).json({ error: "No goal found for this user" });
        }

 
        if (stepsCompleted >= goal.step_goal &&
            hydrationCompleted >= goal.hydration_goal &&
            sleepCompleted >= goal.sleep_goal) {


            if (goal.lastLogDate && new Date(goal.lastLogDate).getTime() === today) {
                return res.status(200).json({ message: "Today's progress already logged" });
            }
            goal.streak += 1;
            goal.lastLogDate = today;
            await goal.save();

            return res.status(200).json({ message: "Progress logged and streak updated!", streak: goal.streak });
        } else {
            res.status(200).json({ message: "Goals not met today, streak not updated" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to log progress" });
    }
};

// Get all goal streaks for the user
const getStreaks = async (req, res) => {
    const userID = req.user.id;

    try {
        const goals = await Goal.find({ userID }).select("streak createdAt").sort({ createdAt: -1 });
        const streaks = goals.map(goal => ({ streak: goal.streak, date: goal.createdAt }));

        res.status(200).json({ streaks });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch streaks" });
    }
};

module.exports = { setGoal, logProgress, getStreaks };
