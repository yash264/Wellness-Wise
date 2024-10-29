import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import joblib

# Sample training data
data = np.array([
    [8, 7, 6],
    [4, 6, 3],
    [7, 9, 5],
    [2, 4, 1],
    [6, 8, 4],
    [5, 7, 3],
    [8, 10, 6],
    [3, 5, 2],
    [7, 9, 5],
    [4, 6, 3]
])

# Scale the data
scaler = StandardScaler()
data_scaled = scaler.fit_transform(data)

# Train the KMeans model
model = KMeans(n_clusters=2, random_state=42)
model.fit(data_scaled)

# Save the trained model and scaler
joblib.dump(model, 'kmeans_clustering_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
