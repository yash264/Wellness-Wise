import React from "react";
import axios from 'axios';

const API_KEY = process.env.REACT_APP_VIDEO_API_KEY;
const BASE_URL = process.env.REACT_APP_VIDEO_BASE_URL;



export const fetchVideos = async (query) => {
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
        console.log(response);
        
        return response.data.items;
    }catch (error) {
        console.log(error);
        return [];
    }
};