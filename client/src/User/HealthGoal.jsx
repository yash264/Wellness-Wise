import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "../Components/Navbar";

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
           <Navbar />

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