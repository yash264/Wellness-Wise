import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MainNavbar from "../Components/MainNavbar";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Update() {

    const params = useParams()
    const id = params.id;

    const [name, setName] = useState([])
    const [gender, setGender] = useState([])
    const [mobile, setMobile] = useState([])
    const [qualification, setQualification] = useState([])
    const [dob, setDob] = useState([])
    const [city, setCity] = useState([])
    const [state, setState] = useState([])
    const [about,setAbout] = useState([])

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
       
    }

    return (
        <div>
            
            <MainNavbar />
            <br/><br/><br/>

            <div class="container px-4 text-center">
                <form class="row g-3" onSubmit={handleSubmit}>
                    <div class="col-md-5">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" />
                    </div>
                    <div class="col-md-5">
                        <label for="gender" class="form-label" >Gender</label>
                        <select class="form-select" name="gender" onChange={(e) => setGender(e.target.value)}>
                            <option selected >Choose...</option>
                            <option onChange={(e) => setGender(e.target.value)}>Male</option>
                            <option onChange={(e) => setGender(e.target.value)}>Female</option>
                        </select>
                    </div>
                    <div class="col-md-5">
                        <label for="mobile" class="form-label">Mobile Number</label>
                        <input type="number" class="form-control" onChange={(e) => setMobile(e.target.value)} placeholder="Enter Mobile number" />
                    </div>
                   
                    <div class="col-md-5">
                        <label for="dob" class="form-label">Date of Birth</label>
                        <input type="date" class="form-control" onChange={(e) => setDob(e.target.value)} />
                    </div>
                    <div class="col-md-5">
                        <label for="city" class="form-label">City</label>
                        <input type="text" class="form-control" onChange={(e) => setCity(e.target.value)} placeholder="Enter your City" />
                    </div>
                    <div class="col-md-5">
                        <label for="state" class="form-label" >State</label>
                        <select class="form-select" name="state" onChange={(e) => setState(e.target.value)}>
                            <option selected >Choose...</option>
                            <option onChange={(e) => setState(e.target.value)}>Uttar Pradesh</option>
                            <option onChange={(e) => setState(e.target.value)}>Madhya Pradesh</option>
                            <option onChange={(e) => setState(e.target.value)}>Haryana</option>
                            <option onChange={(e) => setState(e.target.value)}>Uttarakhand</option>
                            <option onChange={(e) => setState(e.target.value)}>Karnataka</option>
                            <option onChange={(e) => setState(e.target.value)}>Bihar</option>
                            <option onChange={(e) => setState(e.target.value)}>New Delhi</option>
                            <option onChange={(e) => setState(e.target.value)}>Other</option>
                        </select>
                    </div>
                    
                    <div class="col-12">
                        <button type="submit" class="btn btn-outline-primary">Update</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Update;