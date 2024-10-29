from flask import Flask, request, jsonify
import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler

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

if __name__ == "__main__":
    app.run(port=5001)


# Cluster 0 might represent users who have low activity and low nutrition.
# Cluster 1 might represent users who are highly active and have a balanced diet.

# If a user is in cluster 0, suggest workouts, meal plans, or sleep improvement tips that align with users in that group.
# If a user is in cluster 1, suggest maintaining their current routines or advanced strategies for health optimization.