import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import gapi from "gapi-script";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

const FitDataDisplay = () => {

  const [token, setToken] = useState([]);
  const [values,setValues] = useState([]);
  const [fitnessData, setFitnessData] = useState(null);

  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const result = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              "Authorization": `Bearer ${response.access_token}`,
            }
          });
          setValues(result.data);
        setToken(response.access_token);
      }
      catch (error) {
        console.log(error);
      }
    }
  });


  const getFitnessData = async (token) => {
    try {
      console.log(token);
      const response = await axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({     
              aggregateBy: [{
                dataSourceId:
                  'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
              }],
              bucketByTime: { 'durationMillis': 86400000 },
              startTimeMillis: 1454284800000,
              endTimeMillis: 1455062400000    
            })
    });
    console.log(response);
  }catch (error) {
    console.log(error);
  }
};

return (
  <div>
    <h2>Google Fit Data</h2>

    <p>Name : {values.name}</p> 
    <p>Email : {values.email} <img src={`${values.picture}`} style={{width:"35px",float:"right"}} /></p>

    {/*<GoogleLogin
      onSuccess={credentialResponse => {
        const response = jwtDecode(credentialResponse.credential);
        console.log(response);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />;*/}
    <br/>

    <button onClick={login} class="btn btn-outline-primary" >Login</button>
    {token}
    <button onClick={() => getFitnessData(token)}>Show</button>

  </div>
);
};

export default FitDataDisplay;
