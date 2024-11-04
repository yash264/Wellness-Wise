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
        axios.post('http://localhost:5000/healthGoal', { stepGoal, hydrationGoal, sleepGoal, streak },{
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },

        })
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

            <div className="col-md-6">
                <h5>Number of Continous Streak : {streak} </h5>
            </div>

            <div className="container px-4 text-center">
                <div className="row gx-5">
                    <div className="col">
                        <div className="p-3">
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-md-8">
                                    <label className="form-label">Step Goal (in steps)<span className="badge bg-secondary">{stepGoal}</span></label>
                                    <input type="range" id="vol" name="vol" min="0" max="10000" value={stepGoal}
                                        onChange={(e) => setStepGoal(e.target.value)} />
                                    
                                </div>
                                <div className="col-md-8">
                                    <label className="form-label">Hydration Goal (in ml) <span className="badge bg-secondary">{hydrationGoal}</span></label>
                                    <input type="range" id="vol" name="vol" min="0" max="10000" value={hydrationGoal}
                                        onChange={(e) => setHydration(e.target.value)} />
                                   
                                </div>
                                <div className="col-md-8">
                                    <label className="form-label">Sleep Goal (in hours) <span className="badge bg-secondary">{sleepGoal}</span></label>
                                    <input type="range" id="vol" name="vol" min="0" max="12" value={sleepGoal}
                                        onChange={(e) => setSleepGoal(e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-outline-primary">Set Goal</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col">
                        <div className="p-3">Custom column padding</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HealthGoal;