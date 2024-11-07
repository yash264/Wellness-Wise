import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { fetchVideos } from '../Components/VideoContent';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function GoogleFit() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getMeditationVideos = async () => {
            const meditationVideos = await fetchVideos("meditation");
            setVideos(meditationVideos);
        };
        getMeditationVideos();
    }, []);

    return (
        <>
            <Navbar />
            <h2>Meditation Videos</h2>
            <div className="video-grid">
                {videos.map((video) => (
                    <section key={video.id.videoId}>
                        <h5>{video.snippet.title}</h5>
                        <iframe
                            width="300"
                            height="220"
                            src={`https://www.youtube.com/embed/${video.id.videoId}?controls=0&showinfo=0&modestbranding=1&rel=0`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video.snippet.title}
                        ></iframe>
                    </section>
                ))}
            </div>
        </>
    )
}

export default GoogleFit;