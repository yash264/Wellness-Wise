import React, { useEffect, useState } from 'react';

const FitDataDisplay = () => {
  const [fitData, setFitData] = useState(null);   // State to hold the fetched data
  const [loading, setLoading] = useState(true);    // State to handle loading

  useEffect(() => {
    // Fetch data from the backend route we created
    fetch('http://localhost:5000/fit-data')        // Adjust URL as needed
      .then(response => response.json())
      .then(data => {
        setFitData(data);
        setLoading(false);  // Set loading to false when data is loaded
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);  // Set loading to false if there's an error
      });
  }, []);

  return (
    <div>
      <h2>Google Fit Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : fitData ? (
        <pre>{JSON.stringify(fitData, null, 2)}</pre>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default FitDataDisplay;
