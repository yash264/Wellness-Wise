import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ChatBox from "../Components/ChatBox";
import Navbar from "../Components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function GoogleFit() {

    return (
        <>
            <Navbar />
        </>
    )
}

export default GoogleFit;