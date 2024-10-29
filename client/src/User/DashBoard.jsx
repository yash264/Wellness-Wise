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
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.post('http://localhost:5000/dashboardData',{email})
            .then(result => {
                setValues(result.data.userData);
            })
            .catch(error => {
                console.log(error);
            })
    }, [email])

    const logout=(e)=>{
        e.preventDefault();
            navigate("../User/login");
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