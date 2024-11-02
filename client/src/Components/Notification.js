import React from "react";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notification() {

    const [name,setName] = useState([])
    const [email,setEmail] = useState([])
    const [message,setMessage] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/sendMail',{name,email,message});
        if(response.data == "mail send"){
            toast.success("Mail Send");
        }
    }

    return (
        <>
            <section className="contact-section py-5 text-center" id="contact">
                <h2>Contact Us</h2>
                <p className="text-muted">We’d love to hear from you! Fill out the form below to reach out to our team.</p>
                <div className="container">
                    <form className="row g-3" onSubmit={handleSubmit} >
                        <div className="col-md-6">
                            <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" />
                        </div>
                        <div className="col-md-6">
                            <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" />
                        </div>
                        <div className="col-12">
                            <textarea className="form-control" id="message" rows="4" onChange={(e) => setMessage(e.target.value)} placeholder="Enter Your Message"></textarea>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-outline-primary">Send Message</button>
                        </div>
                    </form>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}