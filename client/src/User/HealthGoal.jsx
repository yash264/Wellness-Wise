import React, { useState, useEffect } from "react";
import axios from "axios";
import MainNavbar from "../Components/MainNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function HealthGoal() {
    const [stepGoal, setStepGoal] = useState(5000);
    const [hydrationGoal, setHydrationGoal] = useState(5000);
    const [sleepGoal, setSleepGoal] = useState(7);

    const [stepsCompleted, setStepsCompleted] = useState(0);
    const [hydrationCompleted, setHydrationCompleted] = useState(0);
    const [sleepCompleted, setSleepCompleted] = useState(0);

 
    const [trackGoal, setTrackGoal] = useState([]); 
    const [showModal, setShowModal] = useState(false);

 
    useEffect(() => {
        fetchStreaks();
    }, []);

    // Function to handle setting a new goal
    const handleSetGoal = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/goals/setGoal",
            { stepGoal, hydrationGoal, sleepGoal },
            { headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } }
        )
            .then(res => {
                setShowModal(false);
                fetchStreaks();
            })
            .catch(err => console.error(err));
    };

    // Function to handle logging daily progress
    const handleLogProgress = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/goals/logProgress",
            { stepsCompleted, hydrationCompleted, sleepCompleted },
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } }
        )
            .then(res => {
                toast.error(res.data.message);
                fetchStreaks();
            })
            .catch(err => console.error(err));
    };

    // Function to fetch streaks
    const fetchStreaks = async() => {
        try {
           const res=await axios.get("http://localhost:5000/goals/streaks", {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
            })
            setTrackGoal(res.data.goals)     
        } catch (error) {
            console.error(error);
        }
    };
    
    console.log(trackGoal);
    
    return (
        <>
            <MainNavbar />


        <div className="container mt-2">
            <Button variant="primary " onClick={() => setShowModal(true)}>
                Set Goal
            </Button>

            {/* Modal for setting goals */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Set Your Health Goal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSetGoal}>
                        <label>Step Goal (in steps):</label>
                        <input type="number" value={stepGoal} onChange={(e) => setStepGoal(e.target.value)} className="form-control" />

                        <label>Hydration Goal (in ml):</label>
                        <input type="number" value={hydrationGoal} onChange={(e) => setHydrationGoal(e.target.value)} className="form-control" />

                        <label>Sleep Goal (in hours):</label>
                        <input type="number" value={sleepGoal} onChange={(e) => setSleepGoal(e.target.value)} className="form-control" />

                        <Button variant="primary" type="submit" className="mt-3">Save Goal</Button>
                    </form>
                </Modal.Body>
            </Modal>

            <div className="mt-5">
                <h4>Log Today's Progress</h4>
                <form onSubmit={handleLogProgress}>
                    <label>Steps Completed:</label>
                    <input type="number" value={stepsCompleted} onChange={(e) => setStepsCompleted(e.target.value)} className="form-control" />

                    <label>Hydration Completed (in ml):</label>
                    <input type="number" value={hydrationCompleted} onChange={(e) => setHydrationCompleted(e.target.value)} className="form-control" />

                    <label>Sleep Completed (in hours):</label>
                    <input type="number" value={sleepCompleted} onChange={(e) => setSleepCompleted(e.target.value)} className="form-control" />

                    <Button variant="success" type="submit" className="mt-3">Log Progress</Button>
                </form>
            </div>

            <div className="mt-5">
                <h4>Goal Streaks</h4>
                    {trackGoal.length > 0 ? (
                        <ul className="list-group">
                            {trackGoal.map((track, index) => (
                                <li key={track._id || index} className="list-group-item">
                                    <strong>Streak:</strong> {track.streak}{" "}
                                    {track.streak > 5 ? "🌟" : track.streak > 1 ? "🔥" : "💤"} 
                                   
                                    <div className="mt-2">
                                    <p>Hydration : {track.hydration_goal} ml</p>
                                    <p>Step : {track.step_goal} steps</p>
                                    <p>Sleep : {track.sleep_goal} hours</p>
                                        <strong>Set Date:</strong> {new Date(track.createdAt).toLocaleDateString()}
                                    </div>
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p>No streaks yet. Start setting goals and tracking progress!</p>
                )}
            </div>
            <ToastContainer />
        </div>
        </>
    );
}

export default HealthGoal;
