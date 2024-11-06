import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

const FitDataDisplay = () => {

  const [token, setToken] = useState("");
  const [fitnessData, setFitnessData] = useState(null);

  const navigate = useNavigate()

  const handleSuccess = (response) => {
    const accessToken = response.credential;
    getFitnessData(accessToken);
  };

  const handleFailure = () => {
    console.log("Login Failed");
  };

  const getFitnessData = async (accessToken) => {
    try {
      const response = await axios.post("http://localhost:5000/api/fitness-data", {
        accessToken,
        requestData: {
          aggregateBy: [
            {
              dataTypeName: "com.google.step_count.delta",
              dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
            },
          ],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: Date.now() - 7 * 86400000, // Last 7 days
          endTimeMillis: Date.now(),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching fitness data:", error);
    }
  };

  return (
    <div>
      <h2>Google Fit Data</h2>

      <GoogleLogin
        onSuccess={handleSuccess} onFailure={handleFailure}
      />

    </div>
  );
};

export default FitDataDisplay;
