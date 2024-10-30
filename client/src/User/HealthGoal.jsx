import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function HealthGoal () {

    const params = useParams()
    const email = params.email;

    const [values, setValues] = useState([])
    const navigate = useNavigate()

    const [stepGoal, setStepGoal] = useState([])
    const [hydrationGoal, setHydration] = useState([])
    const [sleepGoal, setSleepGoal] = useState([])

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/healthGoal', { email, stepGoal, hydrationGoal, sleepGoal })
            .then(result => {
                if (result.data === "Email Already Exists") {
                    //toast.error("Email Id Already Exists")
                }
                else if (result.data === "registered") {
                    //toast.success("Registered Successfully");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
        <h3>Health Goal</h3>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Services</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link" to={`../User/dashboard/${email}`}>Dashboard</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to={`../User/dataLogging/${email}`}>Data Logging</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to={`../User/healthGoal/${email}`}>Health Goal</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to={`../User/googleFit/${email}`}>Google Fit</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Profile
                                </a>
                                <ul class="dropdown-menu">
                                    <Link class="nav-link" to={`../User/update/${email}`}>Update</Link>
                                    <Link class="nav-link" to={`../User/delete/${email}`}>Delete</Link>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <form class="row g-3" onSubmit={handleSubmit}>
                <div class="col-md-4">
                    <label for="inputState" class="form-label">Step Goal</label>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => setStepGoal(e.target.value)}>
                        <option selected>Choose ... </option>
                        <option onChange={(e) => setStepGoal(e.target.value)}>1</option>
                        <option onChange={(e) => setStepGoal(e.target.value)}>2</option>
                        <option onChange={(e) => setStepGoal(e.target.value)}>3</option>
                        <option onChange={(e) => setStepGoal(e.target.value)}>4</option>
                        <option onChange={(e) => setStepGoal(e.target.value)}>5</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="inputState" class="form-label">Hydration Goal</label>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => setHydration(e.target.value)}>
                        <option selected>Choose ... </option>
                        <option onChange={(e) => setHydration(e.target.value)}>1</option>
                        <option onChange={(e) => setHydration(e.target.value)}>2</option>
                        <option onChange={(e) => setHydration(e.target.value)}>3</option>
                        <option onChange={(e) => setHydration(e.target.value)}>4</option>
                        <option onChange={(e) => setHydration(e.target.value)}>5</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="inputState" class="form-label">Sleep Goal</label>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => setSleepGoal(e.target.value)}>
                        <option selected>Choose ... </option>
                        <option onChange={(e) => setSleepGoal(e.target.value)}>1</option>
                        <option onChange={(e) => setSleepGoal(e.target.value)}>2</option>
                        <option onChange={(e) => setSleepGoal(e.target.value)}>3</option>
                        <option onChange={(e) => setSleepGoal(e.target.value)}>4</option>
                        <option onChange={(e) => setSleepGoal(e.target.value)}>5</option>
                    </select>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-outline-primary">Submit</button>
                </div>
            </form>
        </>
    )
}

export default HealthGoal;