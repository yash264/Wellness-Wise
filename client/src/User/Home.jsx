import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container-fluid m-0 p-0">
            {/* Navbar */}
            <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#home">WellNavi</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                               <a href="#feature" className="nav-link">Features</a>
                            </li>
                            <li className="nav-item">
                               <a href="#aboutus" className="nav-link">About</a>
                            </li>
                            <li className="nav-item">
                                <a href="#contact" className="nav-link">Contact</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="./User/register">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <div
                className="w-100 home d-flex flex-column justify-content-center align-items-center text-center"
                style={{ height: "400px", backgroundColor: "#f0f8ff" }}
                id="home"
            >
                <div className="display-1 fw-bold mb-3">WellNavi</div>
                <div className="text-small text-dark">Navigate your path to a Healthier you !!</div>
            </div>

            {/* Features Section */}
            <section className="features-section py-5 text-center" id="feature">
                <h2 className="mb-1">Features</h2>
                <p className="text-muted mb-4">Explore the top features that WellNavi offers to support your health journey.</p>
                <div className="row">
                    <div className="col-md-4 p-2">
                        
                        <h4>Personalized Health Recommendations</h4>
                        <p>Receive tips and suggestions tailored to your unique health profile.</p>
                    </div>
                    <div className="col-md-4 p-2">
                        <h4>Mindfulness Session Suggestions</h4>
                        <p>Get recommended mindfulness practices based on your current mood and stress levels.</p>
                    </div>
                    <div className="col-md-4 p-2">
                        <h4>Burnout Detection</h4>
                        <p>Identify early signs of burnout and receive guidance on preventive actions.</p>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="about-us-section py-5 bg-light text-center" id="aboutus">
                <h2 className="mb-1">About Us</h2>
                <p className="text-muted mb-4">Meet the team behind WellNavi!</p>
                <div className="row">
                    <div className="col-md-3">
                        <h5>Yash Pandey</h5>
                        <p>Frontend developer passionate about intuitive designs.</p>
                    </div>
                    <div className="col-md-3">
                        <h5>Harshit Pandey</h5>
                        <p>Expert in AI/ML, focusing on health data analytics.</p>
                    </div>
                    <div className="col-md-3">
                        <h5>Lakshit Rajput</h5>
                        <p>Backend specialist ensuring robust and scalable systems.</p>
                    </div>
                    <div className="col-md-3">
                        <h5>Gurmeet</h5>
                        <p>Frontend developer passionate about intuitive designs.</p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-section py-5 text-center" id="contact">
                <h2>Contact Us</h2>
                <p className="text-muted">We’d love to hear from you! Fill out the form below to reach out to our team.</p>
                <div className="container">
                    <form className="row g-3">
                        <div className="col-md-6">
                            {/* <label htmlFor="name" className="form-label">Name</label> */}
                            <input type="text" className="form-control" id="name" placeholder="Your Name" />
                        </div>
                        <div className="col-md-6">
                            {/* <label htmlFor="email" className="form-label">Email</label> */}
                            <input type="email" className="form-control" id="email" placeholder="Your Email" />
                        </div>
                        <div className="col-12">
                            {/* <label htmlFor="message" className="form-label">Message</label> */}
                            <textarea className="form-control" id="message" rows="4" placeholder="Your Message"></textarea>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Home;
