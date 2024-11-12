import React from "react";
import { useState, useEffect } from "react";
import MainNavbar from "../Components/MainNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";


function GoogleFit() {

    const [search,setSearch] = useState('Meditation');
    const [videos, setVideos] = useState([]);
;

    const fetchVideos = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/youtube`, {
                params: { q: search },
            });
            setVideos(response.data.items);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
           fetchVideos();
    }

    return (
        <>
            <MainNavbar />

            <div className="mt-3 d-flex flex-column  align-items-center">
            <h3>Motivational Videos</h3>
            <form class="row g-3" onSubmit={handleSubmit}>
                <div class="col-12">
                    <select id="inputText" class="form-select" onChange={(e) => setSearch(e.target.value)}>
                        <option selected onChange={(e) => setSearch(e.target.value)}>Choose...</option>
                        <option onChange={(e) => setSearch(e.target.value)}>Health Tips</option>
                        <option onChange={(e) => setSearch(e.target.value)}>Meditation</option>
                        <option onChange={(e) => setSearch(e.target.value)}>Exercises</option>
                        <option onChange={(e) => setSearch(e.target.value)}>Yoga</option>
                        <option onChange={(e) => setSearch(e.target.value)}>Sleep Music</option>
                        <option onChange={(e) => setSearch(e.target.value)}>Stress Relief</option>
                        <option onChange={(e) => setSearch(e.target.value)}>Healthy Eating Recipe</option>
                    </select>
                </div>
                <div class="col-12 d-flex justify-content-center">
                    <button type="submit" class="btn btn-outline-primary">Search</button>
                </div>
            </form>
            <br/>

            <div className="d-flex flex-row flex-wrap mt-2">
                {videos.map((video) => (
                    <section key={video.id.videoId} className="d-flex flex-column overflow-hidden yt-card" style={{width:"300px",margin:"10px",height:"300px"}}>
                        <h6 style={{float:"right",width:"300px",height:"60px"}} >{video.snippet.title}</h6>
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
            </div>
        </>
    )
}

export default GoogleFit;