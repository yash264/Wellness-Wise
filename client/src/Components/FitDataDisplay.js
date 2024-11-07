import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import gapi from "gapi-script";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

const FitDataDisplay = () => {

  const [values, setValues] = useState([]);

  const navigate = useNavigate()

  /*const login = useGoogleLogin({
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
            { dataTypeName: "com.google.height" },
            { dataTypeName: "com.google.weight" },
            { dataTypeName: "com.google.heart_rate.bpm" }
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
  };*/

  const API_KEY = 'AIzaSyC-SamqDmPaufQZ0zMSqyG6IApbWx078IY';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const showVideo = async(query) => {
    try {
      const response = await axios.get(BASE_URL, {
          params: {
              key: API_KEY,
              part: 'snippet',
              q: query,
              maxResults: 10,
              type: 'video',
          },
      });
      console.log(response.data);
      //return response.data.items;
  } catch (error) {
      console.error("Error fetching videos:", error);
      return [];
  }
  }

  const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getMeditationVideos = async () => {
           // const meditationVideos = await fetchVideos("meditation");
            //setVideos(meditationVideos);
        };
        getMeditationVideos();
    }, []);

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

      <button  class="btn btn-outline-primary" >Login</button>
      <br/>
      <br/>
      <button  class="btn btn-outline-danger">Fitness Data</button><br />
        

        <button onClick={()=> showVideo('cricket')} class="btn btn-outline-primary" >Show Video</button>
        <h2>Meditation Videos</h2>
            <ul>
                {videos.map((video) => (
                    <li key={video.id.videoId}>
                        <h3>{video.snippet.title}</h3>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video.snippet.title}
                        ></iframe>
                    </li>
                ))}
            </ul>
    </div>
  );
};

export default FitDataDisplay;
