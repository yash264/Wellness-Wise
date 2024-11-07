import React from "react";
import { Link } from "react-router-dom";
import Notification from "../Components/Notification";
import { Features } from "../Components/Features";
import Navbar from "../Components/Navbar";
import { Aboutus } from "../Components/Aboutus";

function Home() {
    return (
        <div className="container-fluid m-0 p-0">
            {/* Navbar */}
            <Navbar/>

            {/* Header */}
            {/* <div
                className="w-100 home d-flex flex-column justify-content-center align-items-center text-center"
                style={{ height: "400px", backgroundColor: "#f0f8ff" }}
                id="home"
            >
                <div className="display-1 fw-bold mb-3">WellNavi</div>
                <div className="text-small text-dark">Navigate your path to a Healthier you !!</div>
            </div> */}

            {/* Features Section */}
           <Features/>
            {/* About Us Section */}
            <Aboutus/>
            <Notification />
        </div>
    );
}

export default Home;
