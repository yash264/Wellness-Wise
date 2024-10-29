from flask import Flask, request, jsonify
import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler
from meals import recommend_meals
import pandas as pd
from datetime import datetime
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

        # Return the cluster result as JSON
        return jsonify({"cluster": int(cluster)})

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
        sentiment = TextBlob(log['mood']).sentiment.polarity
        trend = "High stress" if log['stress_level'] > 7 else "Low stress"
        mood_trends.append({
            "mood": log['mood'],
            "stress_level": log['stress_level'],
            "sentiment": sentiment,
            "trend": trend,
            "timestamp": log['timestamp']
        })

    # Provide recommendations based on mood trends
    recommendations = []
    for trend in mood_trends:
        if trend['trend'] == "High stress":
            recommendations.append("Consider breathing exercises or a short walk.")
        elif trend['sentiment'] < -0.5:
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