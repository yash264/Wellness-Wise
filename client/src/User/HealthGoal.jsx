import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function HealthGoal () {

    const params = useParams()
    const email = params.email;

    const [values, setValues] = useState([])
    const navigate = useNavigate()

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
        </>
    )
}

export default HealthGoal;