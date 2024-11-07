import React from "react";
import { useState, useEffect } from "react";
import MainNavbar from "../Components/MainNavbar";
import { fetchVideos } from '../Components/VideoContent';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function GoogleFit() {

    const [search,setSearch] = useState([]);
    const [videos, setVideos] = useState([]);

    /*useEffect(() => {
        const getMeditationVideos = async () => {
            const meditationVideos = await fetchVideos("meditation");
            setVideos(meditationVideos);
        };
        getMeditationVideos();
    }, []);*/

    const handleSubmit = (e) => {
        e.preventDefault();
        const getMeditationVideos = async () => {
            const meditationVideos = await fetchVideos(search);
            setVideos(meditationVideos);
        };
        getMeditationVideos();
    }

    return (
        <>
            <MainNavbar />
            <br /><br /><br />

            <h3>Motivational Videos</h3>
            <form class="row g-3" onSubmit={handleSubmit}>
                <div class="col-md-4">
                    <select id="inputText" class="form-select" onChange={(e) => setSearch(e.target.value)}>
                        <option selected onChange={(e) => setSearch(e.target.value)}>Choose...</option>
                        <option onChange={(e) => setSearch(e.target.value)}>Health Tips</option>
                        <option onChange={(e) => setSearch(e.target.value)}>Meditation</option>
                        <option onChange={(e) => setSearch(e.target.value)}>Exercises</option>
                        <option onChange={(e) => setSearch(e.target.value)}>Yoga</option>
                    </select>
                </div>
                <div class="col-4">
                    <button type="submit" class="btn btn-outline-primary">Search</button>
                </div>
            </form>
            <br/>

            <div className="video-grid">
                {videos.map((video) => (
                    <section key={video.id.videoId}>
                        <h6 style={{float:"right"}} >{video.snippet.title}</h6>
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