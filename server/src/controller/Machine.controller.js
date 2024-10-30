const axios = require("axios")
const User_Health = require("../models/User_Health.model");
const recommendations = async (req, res) => {
    const { userID, activity, nutrition, sleep, sleep_quality, Scrren_time_minutes, Caffine_intake, mood, stress_level, diet } = req.body
    try {
        await User_Health.create({ userID, activity, nutrition, sleep, sleep_quality, Scrren_time_minutes, Caffine_intake, mood, stress_level, diet });
        
        const sleep_analysis = await analyze_sleep({
            sleep_hours: sleep,
            quality: sleep_quality,
            screen_time_mins: Scrren_time_minutes,
            caffeine_intake: Caffine_intake
        })
        const meal = await meal_recommendation({
            diet_type: diet
        })
        const activity_analysis = await analyze_activity({
            userId: userID,
            activity: activity,
            sleep: sleep,
            nutrition: nutrition
        })
        const mood_analysis = await analyze_mood({
            mood: mood,
            stress_level: stress_level
        })

        res.status(201).json({
            mood_response: mood_analysis,
            sleep_response: sleep_analysis,
            meal_response: meal,
            activity_response: activity_analysis
        })

    } catch (error) {
        res.status(500).send("Error fetching recommendations" + error);
    }
}


const analyze_mood = async (body) => {
    //   "mood": "Feeling happy",
    // "stress_level": 5
    try {
        const log_mood = await axios.post("http://127.0.0.1:5001/api/log_mood", body);

        const response = await axios.get("http://127.0.0.1:5001/api/analyze_mood");
        

        return response.data
    } catch (error) {
        return error;
        console.log(error);
    }
}
const analyze_activity = async (body) => {
    // "userId": "test-user",
    // "activity": 7,
    // "sleep": 7,
    // "nutrition": 5
    try {
        const response = await axios.post("http://127.0.0.1:5001/api/recommendations", body);
        
        return response.data
    } catch (error) {
        return error;
        console.log(error);
    }
}

const meal_recommendation = async (body) => {
    // "diet_type": "vegan"
    try {
        const response = await axios.post("http://127.0.0.1:5001/api/meal/recommendations", body);

        return response.data
    } catch (error) {
        return error;
        console.log(error);
    }
}
const analyze_sleep = async (body) => {
    // "sleep_hours": 8,
    // "quality": "good",
    // "screen_time_mins": 45,
    //  "caffeine_intake": "low"
    try {

        const log_sleep = await axios.post("http://127.0.0.1:5001/api/log_sleep", body);
        

        const response = await axios.get("http://127.0.0.1:5001/api/sleep_analysis");

        return response.data
    } catch (error) {
        return error;
        console.log(error);
    }
}
module.exports = { recommendations }