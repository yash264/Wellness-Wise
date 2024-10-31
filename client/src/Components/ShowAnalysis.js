
import React from 'react';

function ShowAnalysis({ data }) {
    // Format the date for better readability
    
    const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div>
            <h2 className='text-center mt-2 text-dark fw-bold'>Activity Log</h2>
            {data.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
                .map((entry) => (
                    <div key={entry._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                        <p><strong>Date:</strong> {formatDate(entry.date)}</p>

                        <p><strong>Activity Analysis:</strong> {entry.activity_analysis}</p>

                        {entry.mood_analysis.length > 0 && (
                            <div>
                                <strong>Mood Analysis:</strong>
                                <ul>
                                    {entry.mood_analysis.map((mood, index) => (
                                        <li key={index}>{mood}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {entry.sleep_analysis.length > 0 && (
                            <div>
                                <strong>Sleep Analysis:</strong>
                                <ul>
                                    {entry.sleep_analysis.map((sleep, index) => (
                                        <li key={index}>{sleep}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {entry.meal_recommendation.length > 0 ? (
                            <div>
                                <strong>Meal Recommendations:</strong>
                                <ul>
                                    {entry.meal_recommendation.map((meal, index) => (
                                        <li key={index}>{meal.meal} ({meal.calories} calories, {meal.protein}g protein)</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>No meal recommendations available.</p>
                        )}

                        <p><strong>Last Updated:</strong> {formatDate(entry.updatedAt)}</p>
                    </div>
                ))}
        </div>
    );
}

export default ShowAnalysis;
