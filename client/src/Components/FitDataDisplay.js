import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import gapi from "gapi-script";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

const FitDataDisplay = () => {

  const [token, setToken] = useState([]);
  const [values, setValues] = useState([]);
  const [fitnessData, setFitnessData] = useState([]);

  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const result = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            }
          });
        console.log(result);
        setValues(result.data);
        setToken(response.access_token);
      }
      catch (error) {
        console.log(error);
      }
    },
    scope: "https://www.googleapis.com/auth/fitness.activity.read",
  });


  const getFitnessData = async (token) => {
    try {
      console.log(token);
      const response = await axios.post(
        'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        {
          headers : {
            Authorization : `Bearer  ${token}`,
            'Content-Type' : 'application/json',
          },
        },
        {
          aggregateBy: [
            { dataTypeName: "com.google.step_count.delta" },
            /*{ dataTypeName: "com.google.height" },
            { dataTypeName: "com.google.weight" },
            { dataTypeName: "com.google.heart_rate.bpm" }*/
          ],
          bucketByTime: { durationMillis: 86400000 }, 
          startTimeMillis: Date.now() - 24 * 60 * 60 * 1000, 
          endTimeMillis: Date.now()
        },
      );
      console.log(response);
      setFitnessData(response.data.bucket[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Google Fit Data</h2>

      <div class="container text-center">
        <div class="row">
          <div class="col">
            <p>Name : {values.name}</p>
          </div>
          <div class="col">
            <p>Email : {values.email} <img src={`${values.picture}`} style={{ width: "35px", float: "right" }} /> </p>
          </div>
        </div>
      </div>

      {/*<GoogleLogin
      onSuccess={credentialResponse => {
        const response = jwtDecode(credentialResponse.credential);
        console.log(response);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />;*/}

      <button onClick={login} class="btn btn-outline-primary" >Login</button>
      <br/>
      <br/>
      <button onClick={() => getFitnessData(token)} class="btn btn-outline-danger">Fitness Data</button><br />
        <div>
          <h5>Step Count Data (Last 24 Hours) : {fitnessData.endTimeMillis/86400000 - fitnessData.startTimeMillis/86400000}</h5>
        </div>


    </div>
  );
};

export default FitDataDisplay;
