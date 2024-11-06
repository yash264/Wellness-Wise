import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import FitDataDisplay from '../Components/FitDataDisplay';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import FitDataDisplay from "../Components/FitDataDisplay";

function GoogleFit() {

    return (
        <>
            <Navbar />
            <FitDataDisplay/>
        </>
    )
}

export default GoogleFit;