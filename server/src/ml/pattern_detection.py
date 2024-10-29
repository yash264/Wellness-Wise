from flask import Flask, request, jsonify
import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler
from meals import recommend_meals
import pandas as pd
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