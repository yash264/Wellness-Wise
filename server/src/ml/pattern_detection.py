from flask import Flask, request, jsonify
import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler
from meals import recommend_meals
import pandas as pd
from datetime import datetime, timedelta
from textblob import TextBlob
# from chatterbot import ChatBot
# from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__)

# Load model and scaler
model = joblib.load("kmeans_clustering_model.pkl")
scaler = joblib.load("scaler.pkl")


@app.route('/api/recommendations', methods=['POST'])
def get_recommendation():
    try:
        data = request.json
        activity = data.get("activity")
        sleep = data.get("sleep")
        nutrition = data.get("nutrition")

        # Prepare and scale input
        user_input = scaler.transform([[activity, sleep, nutrition]])
        cluster = model.predict(user_input)[0]
        
        if(int(cluster) == 0):
            return jsonify({"recommendation":"Prefer taking a walk or going for a run. Take proper sleep and maintain a healthy diet." }),200
        elif(int(cluster) == 1):
            return jsonify({"recommendation":"Consider maintaining your current routine and taking a healthy and nutritious approach to health." }),200 

        

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# In-memory log for tracking meals
nutrition_log = []

@app.route('/api/meal/recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    diet_type = data.get('diet_type')
    recommendations = recommend_meals(diet_type)
    return jsonify(recommendations)

@app.route('/api/meal/log_meal', methods=['POST'])
def log_meal():
    data = request.get_json()
    meal = data.get('meal')
    calories = data.get('calories')
    protein = data.get('protein')
    
    # Log the meal
    nutrition_log.append({
        'meal': meal,
        'calories': calories,
        'protein': protein
    })
    
    return jsonify({"message": "Meal logged successfully!"})

@app.route('/api/meal/nutrition_summary', methods=['GET'])
def nutrition_summary():
    # Convert log to DataFrame for analysis
    df = pd.DataFrame(nutrition_log)
    total_calories = df['calories'].sum() if not df.empty else 0
    total_protein = df['protein'].sum() if not df.empty else 0
    
    return jsonify({
        "total_calories": total_calories,
        "total_protein": total_protein,
        "meals_logged": len(nutrition_log)
    })


mood_logs_collection =[]
sleep_logs_collection = [] 

# Endpoint for logging mood
@app.route('/api/log_mood', methods=['POST'])
def log_mood():
    data = request.get_json()
    mood = data.get('mood')
    stress_level = data.get('stress_level')
    timestamp = datetime.now().isoformat()

    # Insert log into MongoDB
    mood_logs_collection.append({
        "mood": mood,
        "stress_level": stress_level,
        "timestamp": timestamp
    })

    return jsonify({"message": "Mood logged successfully"}), 201

# Endpoint for analyzing mood trends
@app.route('/api/analyze_mood', methods=['GET'])
def analyze_mood():
    # Analyze trends using sentiment analysis
    mood_trends = []

    for log in mood_logs_collection:
        # Compute sentiment for the current log entry
        mood_value = log.get('mood')
        stress_level = int(log.get('stress_level', 0))  # Convert stress_level to int

        if mood_value:  # Check if mood_value is not None
            sentiment = TextBlob(mood_value).sentiment.polarity
            trend = "High stress" if stress_level > 7 else "Low stress"

            mood_trends.append({
                "mood": mood_value,
                "stress_level": stress_level,
                "sentiment": sentiment,
                "trend": trend,
                "timestamp": log['timestamp']
            })

    # Provide recommendations based on mood trends
    recommendations = []
    for trend in mood_trends:
        if trend['trend'] == "High stress":
            recommendations.append("Consider breathing exercises or a short walk.")
        elif trend['sentiment'] is not None and trend['sentiment'] < -0.5:
            recommendations.append("Try a relaxation exercise or listen to calming music.")
        else:
            recommendations.append("Keep up the good mood! Stay active and hydrated.")
    return jsonify({"mood_trends": mood_trends, "recommendations": recommendations}), 200

   
    

# Endpoint to log sleep data
@app.route('/api/log_sleep', methods=['POST'])
def log_sleep():
    data = request.json
    data['timestamp'] = datetime.now().isoformat()
    sleep_logs_collection.append(data)  # Store data in MongoDB
    return jsonify({"message": "Sleep data logged", "data": data}), 200

# Function to analyze sleep patterns
def analyze_sleep():
    sleep_logs = [log["sleep_hours"] for log in sleep_logs_collection]
    sleep_hours = [log["sleep_hours"] for log in sleep_logs_collection]
    avg_sleep = np.mean(sleep_hours) if sleep_hours else 0
    quality_counts = {
        "good": sum(1 for log in sleep_logs_collection if log["quality"] == "good"),
        "fair": sum(1 for log in sleep_logs_collection if log["quality"] == "fair"),
        "poor": sum(1 for log in sleep_logs_collection if log["quality"] == "poor")
    }
    
    return {
        "average_sleep_hours": avg_sleep,
        "quality_distribution": quality_counts
    }

# Function to generate sleep recommendations
def sleep_recommendations(analysis):
    recommendations = []
    avg_sleep = analysis["average_sleep_hours"]
    quality_counts = analysis["quality_distribution"]

    if avg_sleep < 7:
        recommendations.append("Try to increase sleep duration to at least 7 hours.")
    if quality_counts["poor"] > quality_counts["good"]:
        recommendations.append("Consider reducing screen time before bed or avoid caffeine in the evening.")
    if quality_counts["fair"] >= quality_counts["good"]:
        recommendations.append("Maintain a consistent sleep schedule for improved quality.")

    return recommendations

# Endpoint for sleep analysis and recommendations
@app.route('/api/sleep_analysis', methods=['GET'])
def sleep_analysis():
    analysis = analyze_sleep()
    recommendations = sleep_recommendations(analysis)

    return jsonify({
        "analysis": analysis,
        "recommendations": recommendations
    }), 200


# Mock database collections for demonstration
user_logs = []

# Helper function to calculate rolling averages
def calculate_rolling_average(data, window_size):
    if len(data) < window_size:
        return np.mean(data)
    return np.mean(data[-window_size:])

# Endpoint for logging user data
@app.route('/api/log_health_data', methods=['POST'])
def log_health_data():
    
    data = request.get_json()
    user_id = data.get("user_id")
    timestamp = datetime.now()
    log_entry = {
        "user_id": user_id,
        "stress_level": data.get("stress_level"),
        "activity_level": data.get("activity_level"),
        "sleep_quality": data.get("sleep_quality"),
        "mood_score": data.get("mood_score"),
        "timestamp": timestamp
    }
    user_logs.append(log_entry)  # Log entry to mock DB
    return jsonify({"message": "Health data logged successfully"}), 201

# Endpoint for analyzing burnout risk
@app.route('/api/analyze_burnout', methods=['GET'])
def analyze_burnout():
    print("hey!!")
    user_id = request.args.get("user_id")
    days_to_consider = 14  # Define a period to analyze burnout risk

    # Filter logs for this user within the specified timeframe
    recent_logs = [
        log for log in user_logs
        if log["user_id"] == user_id and log["timestamp"] >= datetime.now() - timedelta(days=days_to_consider)
    ]

    # If not enough data is available
    if len(recent_logs) < days_to_consider:
        return jsonify({"message": "Not enough data to assess burnout risk"}), 201

    # Extract data points
    stress_levels = [log["stress_level"] for log in recent_logs]
    activity_levels = [log["activity_level"] for log in recent_logs]
    sleep_qualities = [log["sleep_quality"] for log in recent_logs]
    mood_scores = [log["mood_score"] for log in recent_logs]

    # Calculate average metrics over the analysis period
    avg_stress = calculate_rolling_average(stress_levels, days_to_consider)
    avg_activity = calculate_rolling_average(activity_levels, days_to_consider)
    avg_sleep = calculate_rolling_average(sleep_qualities, days_to_consider)
    avg_mood = calculate_rolling_average(mood_scores, days_to_consider)

    # Define thresholds for burnout risk
    burnout_risk = False
    if avg_stress > 7 and avg_activity < 4 and avg_sleep < 5 and avg_mood < 3:
        burnout_risk = True

    # Provide recommendations
    recommendations = []
    if burnout_risk:
        recommendations.append("High burnout risk detected. Consider taking a break or engaging in relaxation activities.")
        recommendations.append("Try to increase physical activity levels and improve sleep quality.")
    else:
        recommendations.append("No significant burnout risk detected. Keep maintaining your wellness routines.")

    return jsonify({
        "burnout_risk": burnout_risk,
        "average_stress": avg_stress,
        "average_activity": avg_activity,
        "average_sleep_quality": avg_sleep,
        "average_mood_score": avg_mood,
        "recommendations": recommendations
    }), 200


# chatbot = ChatBot('MyChatBot')
# trainer = ChatterBotCorpusTrainer(chatbot)
# trainer.train('chatterbot.corpus.english')

# @app.route('/chat', methods=['POST'])
# def chat():
#     user_message = request.json['message']
#     response = chatbot.get_response(user_message)
#     return jsonify({'response': str(response)})


if __name__ == "__main__":
    app.run(port=5001)


# Cluster 0 might represent users who have low activity and low nutrition.
# Cluster 1 might represent users who are highly active and have a balanced diet.

# If a user is in cluster 0, suggest workouts, meal plans, or sleep improvement tips that align with users in that group.
# If a user is in cluster 1, suggest maintaining their current routines or advanced strategies for health optimization.