from flask import Flask, request, jsonify
import numpy as np
from sklearn.cluster import KMeans

app = Flask(__name__)

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    try:
        # Extract data from the request
        data = request.get_json()
        
        # Debugging print statement to see the incoming data
        print("Received data:", data)

        # Check if the necessary keys are present in the request
        if not all(key in data for key in ['userId', 'activity', 'sleep', 'nutrition']):
            return jsonify({'error': 'Missing key in request data'}), 400

        user_id = data['userId']
        activity = data['activity']
        sleep = data['sleep']
        nutrition = data['nutrition']

        # Prepare input data for KMeans
        X = np.array([[activity, sleep, nutrition]])

        # Create and fit KMeans
        kmeans = KMeans(n_clusters=1)
        kmeans.fit(X)

        # Get predictions
        prediction = kmeans.predict(X)

        # Return the result
        return jsonify({'userId': user_id, 'recommendation': prediction.tolist()})

    except KeyError as ke:
        print("KeyError:", ke)  # More specific debugging
        return jsonify({'error': f'Missing key: {str(ke)}'}), 400
    except Exception as e:
        print("Error:", e)  # General error message
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)


# Cluster 0 might represent users who have low activity and low nutrition.
# Cluster 1 might represent users who are highly active and have a balanced diet.

# If a user is in cluster 0, suggest workouts, meal plans, or sleep improvement tips that align with users in that group.
# If a user is in cluster 1, suggest maintaining their current routines or advanced strategies for health optimization.