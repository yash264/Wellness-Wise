import React from "react";
import { Link } from "react-router-dom";
import Notification from "../Components/Notification";
import { Banner } from "../Components/Banner";
import  Navbar  from "../Components/Navbar";
import { Features } from "../Components/Features";
import { Aboutus } from "../Components/Aboutus";
import { Contact } from "../Components/Contact";

function Home() {
    return (
        <div className="container-fluid m-0 p-0" style={{ "background-color": "#121212", "color": "#fff"}} >
            {/* Navbar */}
            <Navbar/>

            {/* Header */}
            <Banner/>

            {/* Features Section */}
           <Features/>

            {/* About Us Section */}
            <Aboutus/>

            {/* Contact Section */}
            <Contact/>

        </div>
    );
}

export default Home;
