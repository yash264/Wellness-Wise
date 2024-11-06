import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
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
        axios.post('http://localhost/api/update', { id, name, gender, mobile, qualification, dob, city, state, about })
            .then(result => {
                if(result.data === "updated" ){
                    toast.success("Updated Successfully");
                }
                else if(result.data === "failed" ){
                    toast.error("Email Id can't exist");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            
            <Navbar />

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
                        <label for="qualification" class="form-label" >Highest Qualification</label>
                        <select class="form-select" name="qualification" onChange={(e) => setQualification(e.target.value)}>
                            <option selected >Choose...</option>
                            <option onChange={(e) => setQualification(e.target.value)}>High School X</option>
                            <option onChange={(e) => setQualification(e.target.value)}>Inter Mediate XII</option>
                            <option onChange={(e) => setQualification(e.target.value)}>Bachelor's of Technology</option>
                            <option onChange={(e) => setQualification(e.target.value)}>Bachelor's of Science</option>
                            <option onChange={(e) => setQualification(e.target.value)}>Final Year of Graduation</option>
                            <option onChange={(e) => setQualification(e.target.value)}>Other's</option>
                        </select>
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
                    <div class="col-md-5">
                        <label for="about" class="form-label">About Yourself</label>
                        <input type="text" class="form-control" onChange={(e) => setAbout(e.target.value)} placeholder="Tell about yourself" />
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