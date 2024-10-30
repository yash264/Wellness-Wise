import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function HealthGoal() {

    const params = useParams()
    const email = params.email;

    const [values, setValues] = useState([])
    const navigate = useNavigate()

    const [stepGoal, setStepGoal] = useState([])
    const [hydrationGoal, setHydration] = useState([])
    const [sleepGoal, setSleepGoal] = useState([])
    const [streak, setStreak] = useState([])

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/healthGoal', { stepGoal, hydrationGoal, sleepGoal, streak })
            .then(result => {
                console.log(result);
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
                                <Link class="nav-link" to="../User/dashboard" >Dashboard</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="../User/healthGoal" >Health Goal</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="../User/googleFit" >Google Fit</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="../User/dataLogging" >Community Forms</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Profile
                                </a>
                                <ul class="dropdown-menu">
                                    <Link class="nav-link" to="../User/update" >Update</Link>
                                    <Link class="nav-link" to="../User/delete" >Delete</Link>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br />

            <div class="col-md-6">
                <h5>Number of Continous Streak : {streak} </h5>
            </div>

            <div class="container px-4 text-center">
                <div class="row gx-5">
                    <div class="col">
                        <div class="p-3">
                            <form class="row g-3" onSubmit={handleSubmit}>
                                <div class="col-md-8">
                                    <label class="form-label">Step Goal</label>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => setStepGoal(e.target.value)}>
                                        <option selected>Choose ... </option>
                                        <option onChange={(e) => setStepGoal(e.target.value)}>1</option>
                                        <option onChange={(e) => setStepGoal(e.target.value)}>2</option>
                                        <option onChange={(e) => setStepGoal(e.target.value)}>3</option>
                                        <option onChange={(e) => setStepGoal(e.target.value)}>4</option>
                                        <option onChange={(e) => setStepGoal(e.target.value)}>5</option>
                                        <option onChange={(e) => setStepGoal(e.target.value)}>6</option>
                                        <option onChange={(e) => setStepGoal(e.target.value)}>7</option>
                                        <option onChange={(e) => setStepGoal(e.target.value)}>8</option>
                                        <option onChange={(e) => setStepGoal(e.target.value)}>9</option>
                                        <option onChange={(e) => setStepGoal(e.target.value)}>10</option>
                                    </select>
                                </div>
                                <div class="col-md-8">
                                    <label class="form-label">Hydration Goal</label>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => setHydration(e.target.value)}>
                                        <option selected>Choose ... </option>
                                        <option onChange={(e) => setHydration(e.target.value)}>1</option>
                                        <option onChange={(e) => setHydration(e.target.value)}>2</option>
                                        <option onChange={(e) => setHydration(e.target.value)}>3</option>
                                        <option onChange={(e) => setHydration(e.target.value)}>4</option>
                                        <option onChange={(e) => setHydration(e.target.value)}>5</option>
                                        <option onChange={(e) => setHydration(e.target.value)}>6</option>
                                        <option onChange={(e) => setHydration(e.target.value)}>7</option>
                                        <option onChange={(e) => setHydration(e.target.value)}>8</option>
                                        <option onChange={(e) => setHydration(e.target.value)}>9</option>
                                        <option onChange={(e) => setHydration(e.target.value)}>10</option>
                                    </select>
                                </div>
                                <div class="col-md-8">
                                    <label class="form-label">Sleep Goal</label>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => setSleepGoal(e.target.value)}>
                                        <option selected>Choose ... </option>
                                        <option onChange={(e) => setSleepGoal(e.target.value)}>1</option>
                                        <option onChange={(e) => setSleepGoal(e.target.value)}>2</option>
                                        <option onChange={(e) => setSleepGoal(e.target.value)}>3</option>
                                        <option onChange={(e) => setSleepGoal(e.target.value)}>4</option>
                                        <option onChange={(e) => setSleepGoal(e.target.value)}>5</option>
                                        <option onChange={(e) => setSleepGoal(e.target.value)}>6</option>
                                        <option onChange={(e) => setSleepGoal(e.target.value)}>7</option>
                                        <option onChange={(e) => setSleepGoal(e.target.value)}>8</option>
                                        <option onChange={(e) => setSleepGoal(e.target.value)}>9</option>
                                        <option onChange={(e) => setSleepGoal(e.target.value)}>10</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-outline-primary">Set Goal</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-3">Custom column padding</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HealthGoal;