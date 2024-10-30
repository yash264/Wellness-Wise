import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function DashBoard() {

    const params = useParams()
    const email = params.email;

    const [values, setValues] = useState([])
    const [dietType, setDietType] = useState([])
    const [date, setDate] = useState([])
    const [sleepQuality, setSleepQuality] = useState([])
    const [screenTime, setScreenTime] = useState([])
    const [caffine, setCaffine] = useState([])
    const [mood, setMood] = useState([])
    const [stress, setStress] = useState([])
    const [activity, setActivity] = useState([])
    const [sleep, setSleep] = useState([])
    const [nutrition, setNutrition] = useState([])
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    //  to show user profile onloading the page
    useEffect(() => {
        axios.get('http://localhost:5000/dashboardData')
            .then(result => {
                setValues(result.data.userData);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    //  to logout a person
    const logout = (e) => {
        e.preventDefault();
        navigate("../User/login");
    }

    //  to send data to backend
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/dataLogging', { dietType, date, sleepQuality, screenTime, caffine, mood, stress, activity, sleep, nutrition })
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            <h3>DashBoard</h3>
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
                        <div>
                            <button type="button" class="btn btn-outline-danger" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="container px-4 text-center">
                <div class="row gx-5">
                    <div class="col">
                        <div class="p-3">
                            Welcome Back
                        </div>
                    </div>
                    <div class="col">
                        <div style={{ border: "solid black" }} class="shadow p-3 mb-5 bg-body-tertiary rounded">
                            <table class="table">
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
                </div>

                <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Data Logging
                </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Data Logging</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form class="row g-3" onSubmit={handleSubmit}>
                                    <div class="col-md-6">
                                        <label for="inputDiet" class="form-label">Diet Type</label>
                                        <select class="form-select" aria-label="Default select example" onChange={(e) => setDietType(e.target.value)}>
                                            <option selected>Choose ... </option>
                                            <option onChange={(e) => setDietType(e.target.value)}>Vegeterian</option>
                                            <option onChange={(e) => setDietType(e.target.value)}>Non Vegeterian</option>
                                            <option onChange={(e) => setDietType(e.target.value)}>Vegan</option>
                                            <option onChange={(e) => setDietType(e.target.value)}>Gluten Free</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputDate" class="form-label">Date</label>
                                        <input type="date" class="form-control" onChange={(e) => setDate(e.target.value)} />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputSleep" class="form-label">Sleep Quality</label>
                                        <select class="form-select" aria-label="Default select example" onChange={(e) => setSleepQuality(e.target.value)}>
                                            <option selected>Choose ... </option>
                                            <option onChange={(e) => setSleepQuality(e.target.value)}>Good </option>
                                            <option onChange={(e) => setSleepQuality(e.target.value)}>Moderate </option>
                                            <option onChange={(e) => setSleepQuality(e.target.value)}>Poor </option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputSleep" class="form-label">Sleep</label>
                                        <select class="form-select" aria-label="Default select example" onChange={(e) => setSleep(e.target.value)}>
                                            <option selected>Choose ... </option>
                                            <option onChange={(e) => setSleep(e.target.value)}>1</option>
                                            <option onChange={(e) => setSleep(e.target.value)}>2</option>
                                            <option onChange={(e) => setSleep(e.target.value)}>3</option>
                                            <option onChange={(e) => setSleep(e.target.value)}>4</option>
                                            <option onChange={(e) => setSleep(e.target.value)}>5</option>
                                            <option onChange={(e) => setSleep(e.target.value)}>6</option>
                                            <option onChange={(e) => setSleep(e.target.value)}>7</option>
                                            <option onChange={(e) => setSleep(e.target.value)}>8</option>
                                            <option onChange={(e) => setSleep(e.target.value)}>9</option>
                                            <option onChange={(e) => setSleep(e.target.value)}>10</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputCaffine" class="form-label">Caffine Intake</label>
                                        <select class="form-select" aria-label="Default select example" onChange={(e) => setCaffine(e.target.value)}>
                                            <option selected>Choose ... </option>
                                            <option onChange={(e) => setCaffine(e.target.value)}>Good </option>
                                            <option onChange={(e) => setCaffine(e.target.value)}>Moderate </option>
                                            <option onChange={(e) => setCaffine(e.target.value)}>Poor </option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputNutrition" class="form-label">Nutrition</label>
                                        <select class="form-select" aria-label="Default select example" onChange={(e) => setNutrition(e.target.value)}>
                                            <option selected>Choose ... </option>
                                            <option onChange={(e) => setNutrition(e.target.value)}>1</option>
                                            <option onChange={(e) => setNutrition(e.target.value)}>2</option>
                                            <option onChange={(e) => setNutrition(e.target.value)}>3</option>
                                            <option onChange={(e) => setNutrition(e.target.value)}>4</option>
                                            <option onChange={(e) => setNutrition(e.target.value)}>5</option>
                                            <option onChange={(e) => setNutrition(e.target.value)}>6</option>
                                            <option onChange={(e) => setNutrition(e.target.value)}>7</option>
                                            <option onChange={(e) => setNutrition(e.target.value)}>8</option>
                                            <option onChange={(e) => setNutrition(e.target.value)}>9</option>
                                            <option onChange={(e) => setNutrition(e.target.value)}>10</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputMood" class="form-label">Mood</label>
                                        <input type="text" class="form-control" onChange={(e) => setMood(e.target.value)} />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputStress" class="form-label">Stress Level</label>
                                        <select class="form-select" aria-label="Default select example" onChange={(e) => setStress(e.target.value)}>
                                            <option selected>Choose ... </option>
                                            <option onChange={(e) => setStress(e.target.value)}>1</option>
                                            <option onChange={(e) => setStress(e.target.value)}>2</option>
                                            <option onChange={(e) => setStress(e.target.value)}>3</option>
                                            <option onChange={(e) => setStress(e.target.value)}>4</option>
                                            <option onChange={(e) => setStress(e.target.value)}>5</option>
                                            <option onChange={(e) => setStress(e.target.value)}>6</option>
                                            <option onChange={(e) => setStress(e.target.value)}>7</option>
                                            <option onChange={(e) => setStress(e.target.value)}>8</option>
                                            <option onChange={(e) => setStress(e.target.value)}>9</option>
                                            <option onChange={(e) => setStress(e.target.value)}>10</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputScreen" class="form-label">Screen Time (mins)</label>
                                        <input type="number" class="form-control" onChange={(e) => setScreenTime(e.target.value)} />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputActivity" class="form-label">Activity</label>
                                        <select class="form-select" aria-label="Default select example" onChange={(e) => setActivity(e.target.value)}>
                                            <option selected>Choose ... </option>
                                            <option onChange={(e) => setActivity(e.target.value)}>1</option>
                                            <option onChange={(e) => setActivity(e.target.value)}>2</option>
                                            <option onChange={(e) => setActivity(e.target.value)}>3</option>
                                            <option onChange={(e) => setActivity(e.target.value)}>4</option>
                                            <option onChange={(e) => setActivity(e.target.value)}>5</option>
                                            <option onChange={(e) => setActivity(e.target.value)}>6</option>
                                            <option onChange={(e) => setActivity(e.target.value)}>7</option>
                                            <option onChange={(e) => setActivity(e.target.value)}>8</option>
                                            <option onChange={(e) => setActivity(e.target.value)}>9</option>
                                            <option onChange={(e) => setActivity(e.target.value)}>10</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <br />
                    <p>&copy; 2024 Designed, Developed and Hosted by National Informatics Center.</p>
                    <br />
                </div>
            </div>
        </>
    )
}

export default DashBoard;