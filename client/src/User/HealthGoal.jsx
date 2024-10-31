import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatBox from "../Components/ChatBox";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "../Components/Navbar";

function HealthGoal() {

    const params = useParams()
    const email = params.email;

    const [values, setValues] = useState([])
    const navigate = useNavigate()

    const [stepGoal, setStepGoal] = useState(5000)
    const [hydrationGoal, setHydration] = useState(5000)
    const [sleepGoal, setSleepGoal] = useState(7)
    const [streak, setStreak] = useState(0)

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
                                    <label class="form-label">Step Goal (in steps)<span className="badge bg-secondary">{stepGoal}</span></label>
                                    <input type="range" id="vol" name="vol" min="0" max="10000" value={stepGoal}
                                        onChange={(e) => setStepGoal(e.target.value)} />
                                    
                                </div>
                                <div class="col-md-8">
                                    <label class="form-label">Hydration Goal (in ml) <span className="badge bg-secondary">{hydrationGoal}</span></label>
                                    <input type="range" id="vol" name="vol" min="0" max="10000" value={hydrationGoal}
                                        onChange={(e) => setHydration(e.target.value)} />
                                   
                                </div>
                                <div class="col-md-8">
                                    <label class="form-label">Sleep Goal (in hours) <span className="badge bg-secondary">{sleepGoal}</span></label>
                                    <input type="range" id="vol" name="vol" min="0" max="12" value={sleepGoal}
                                        onChange={(e) => setSleepGoal(e.target.value)} />
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