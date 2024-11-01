import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "../Components/Navbar";

function DataLogging() {

    const params = useParams()
    const email = params.email;

    const [values, setValues] = useState([])
    const [activity, setActivity] = useState([])
    const [sleep, setSleep] = useState([])
    const [nutrition, setNutrition] = useState([])

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.post('http://localhost:5000/dataLogging', { email, activity, sleep, nutrition })
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
            <Navbar />

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