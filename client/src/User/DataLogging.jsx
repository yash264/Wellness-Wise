import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function DataLogging() {

    const params = useParams()
    const email = params.email;

    const [values, setValues] = useState([])
    const [activity, setActivity] = useState([])
    const [sleep, setSleep] = useState([])
    const [nutrition, setNutrition] = useState([])

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.post('http://localhost:5000/api/recommendations', { email, activity, sleep, nutrition })
            .then(result => {
                console.log(result);
                setValues(result.data.userData);
            })
            .catch(error => {
                console.log(error);
            })
    }, [email])

    return (
        <>
            <h3>Data Logging</h3>
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
            <br />
            <form class="row g-3">
                <div class="col-md-4">
                    <label for="inputState" class="form-label">Activity</label>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => setActivity(e.target.value)}>
                        <option selected>Choose ... </option>
                        <option onChange={(e) => setActivity(e.target.value)}>1</option>
                        <option onChange={(e) => setActivity(e.target.value)}>2</option>
                        <option onChange={(e) => setActivity(e.target.value)}>3</option>
                        <option onChange={(e) => setActivity(e.target.value)}>4</option>
                        <option onChange={(e) => setActivity(e.target.value)}>5</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="inputState" class="form-label">Sleep</label>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => setSleep(e.target.value)}>
                        <option selected>Choose ... </option>
                        <option onChange={(e) => setSleep(e.target.value)}>1</option>
                        <option onChange={(e) => setSleep(e.target.value)}>2</option>
                        <option onChange={(e) => setSleep(e.target.value)}>3</option>
                        <option onChange={(e) => setSleep(e.target.value)}>4</option>
                        <option onChange={(e) => setSleep(e.target.value)}>5</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="inputState" class="form-label">Nutrition</label>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => setNutrition(e.target.value)}>
                        <option selected>Choose ... </option>
                        <option onChange={(e) => setNutrition(e.target.value)}>1</option>
                        <option onChange={(e) => setNutrition(e.target.value)}>2</option>
                        <option onChange={(e) => setNutrition(e.target.value)}>3</option>
                        <option onChange={(e) => setNutrition(e.target.value)}>4</option>
                        <option onChange={(e) => setNutrition(e.target.value)}>5</option>
                    </select>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-outline-primary">Submit</button>
                </div>
            </form>
        </>
    )
}

export default DataLogging;