import React from "react";
import axios from 'axios';

const API_KEY = 'AIzaSyC-SamqDmPaufQZ0zMSqyG6IApbWx078IY';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

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
        return response.data.items;
    }catch (error) {
        console.log(error);
        return [];
    }
};