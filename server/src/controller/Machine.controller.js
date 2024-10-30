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

const burnout_detection = async (req, res) => {
    const { user_id,stress_level,activity_level,sleep_quality,mood_score} = req.body
    try {
    
       
        const burnout_res = await detect_burnout({
            user_id: user_id,
            stress_level: stress_level,
            activity_level: activity_level,
            sleep_quality: sleep_quality,
            mood_score: mood_score
        })

        res.status(201).json({
            burnout_response: burnout_res
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
 
    }
}

const meal_recommendation = async (body) => {
    // "diet_type": "vegan"
    try {
        const response = await axios.post("http://127.0.0.1:5001/api/meal/recommendations", body);

        return response.data
    } catch (error) {
        return error;
 
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
 
    }
}
const detect_burnout = async (body) => {
        // "user_id": "6721c85f0fc9e2e05f0bb6c7",
        // "stress_level": 7,
        // "activity_level":8,
        // "sleep_quality": "fair",
        // "mood_score": 5
    try {

        const log_data = await axios.post("http://127.0.0.1:5001/api/log_health_data", body);

        const response = await axios.get("http://127.0.0.1:5001/api/analyze_burnout");
        

        return response.data
    } catch (error) {
        return error;
 
    }
}



module.exports = { recommendations , burnout_detection}