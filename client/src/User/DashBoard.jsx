import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatBox from "../Components/ChatBox";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import ShowAnalysis from "../Components/ShowAnalysis";
import HealthTrendChart from "../Components/HealthTrendChart";
import MoodWordCloud from "../Components/MoodWordCloud";

function DashBoard() {

    const params = useParams()
    const id = params.id;
    
    const [fetch, setFetch] = useState(false)
    const [analysis, setAnalysis] = useState([])
    const [dietType, setDietType] = useState("vegan")
    const [sleepQuality, setSleepQuality] = useState("fair")
    const [screenTime, setScreenTime] = useState()
    const [caffine, setCaffine] = useState("medium")
    const [mood, setMood] = useState("")
    const [stress, setStress] = useState(5)
    const [activity, setActivity] = useState(5)
    const [sleep, setSleep] = useState(5)
    const [nutrition, setNutrition] = useState(5)
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    // Get User Analysis
    const getUserAnalysis = async () => {
        const response = await axios.get(`http://localhost:5000/api/analysis/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        setAnalysis(response.data.analysis)   
        setFetch(prev=>!prev)
    }

    useEffect(() => {
        getUserAnalysis()
    }, [])


    //  to send data to backend
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(mood.length===0 || dietType.length===0 || sleepQuality.length===0 || !screenTime || caffine.length===0 ){
            alert("Please fill all fields")
            return;
        }
        const response=await axios.post('http://localhost:5000/api/recommendations', { userID: id, diet: dietType, sleep_quality: sleepQuality, Scrren_time_minutes: screenTime, Caffine_intake: caffine, mood: mood, stress_level:stress, activity: activity, sleep: sleep, nutrition: nutrition },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        
        if(response.data.success===false){
            console.log("error");
            
        }else{
            toast.success("Analysis Generated");
            getUserAnalysis();
         }
    }

    const URL_ANALYSIS=`/User/analysis/${id}`

    
    return (
        <>
            
            <Navbar />

            <div className="container px-4 text-center">
                {/* <div className="row gx-5">
                    <div className="col">
                        <div className="p-3">
                            Welcome Back
                        </div>
                    </div>
                    <div className="col">
                        <div style={{ border: "solid black" }} className="shadow p-3 mb-5 bg-body-tertiary rounded">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <td>{values === null ? "" : values.name}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="col">Gender</th>
                                        <td>{values === null ? "" : values.gender}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Email</th>
                                        <td>{values === null ? "" : values.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Mobile No.</th>
                                        <td>{values === null ? "" : values.mobile}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Date of Birth</th>
                                        <td>{values === null ? "" : values.dob}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Qualification</th>
                                        <td>{values === null ? "" : values.qualification}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Home Town</th>
                                        <td>{values === null ? "" : values.city}, {values === null ? "" : values.state}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
              
                <button type="button" className="btn btn-outline-primary m-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Data Logging
                </button>

                <Link to={URL_ANALYSIS} className="btn btn-outline-success m-3" >
                    View Analysis
                </Link>

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Data Logging</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="col-md-6">
                                        <label htmlFor="inputDiet" className="form-label">Diet Type</label>
                                        <select className="form-select" aria-label="Default select example" onChange={(e) => setDietType(e.target.value)}>
                                            <option selected>Choose ... </option>
                                            <option onChange={(e) => setDietType(e.target.value)} value="vegetarian">Vegeterian</option>
                                            <option onChange={(e) => setDietType(e.target.value)} value="non-vegetarian">Non Vegeterian</option>
                                            <option onChange={(e) => setDietType(e.target.value)} value="vegan">Vegan</option>
                                            <option onChange={(e) => setDietType(e.target.value)} value="gluten-free">Gluten Free</option>
                                        </select>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <label htmlFor="inputDate" className="form-label">Date</label>
                                        <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} />
                                    </div> */}
                                    <div className="col-md-6">
                                        <label htmlFor="inputSleep" className="form-label">Sleep Quality</label>
                                        <select className="form-select" aria-label="Default select example" onChange={(e) => setSleepQuality(e.target.value)}>
                                            <option selected>Choose ... </option>
                                            <option onChange={(e) => setSleepQuality(e.target.value)} value="good">Good </option>
                                            <option onChange={(e) => setSleepQuality(e.target.value)} value="fair">Fair </option>
                                            <option onChange={(e) => setSleepQuality(e.target.value)} value="poor">Poor </option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputSleep" className="form-label">Sleep <span className="badge bg-secondary">{sleep}</span></label>
                                        <input type="range" id="vol" name="vol" min="0" max="10" value={sleep}
                                            onChange={(e) => setSleep(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputCaffine" className="form-label">Caffine Intake</label>
                                        <select className="form-select" aria-label="Default select example" onChange={(e) => setCaffine(e.target.value)}>
                                            <option selected>Choose ... </option>
                                            <option onChange={(e) => setCaffine(e.target.value)} value="high">High </option>
                                            <option onChange={(e) => setCaffine(e.target.value)} value="medium">Medium </option>
                                            <option onChange={(e) => setCaffine(e.target.value)} value="low">Low </option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputNutrition" className="form-label">Nutrition <span className="badge bg-secondary">{nutrition}</span></label>
                                        <input type="range" id="vol" name="vol" min="0" max="10" value={nutrition}
                                            onChange={(e) => setNutrition(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputMood" className="form-label">Mood</label>
                                        <input type="text" className="form-control" onChange={(e) => setMood(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputStress" className="form-label">Stress Level <span className="badge bg-secondary">{stress}</span></label>
                                        <input type="range" id="vol" name="vol" min="0" max="10" value={stress}
                                            onChange={(e) => setStress(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputScreen" className="form-label">Screen Time (mins)</label>
                                        <input type="number" className="form-control" onChange={(e) => setScreenTime(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputActivity" className="form-label">Activity <span className="badge bg-secondary">{activity}</span></label>
                                        <input type="range" id="vol" name="vol" min="0" max="10" value={activity}
                                            onChange={(e) => setActivity(e.target.value)}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShowAnalysis data={analysis}/>
        </>
    )
}

export default DashBoard;