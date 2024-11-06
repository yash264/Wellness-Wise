import React from "react";
import Navbar from "../Components/Navbar";
import FitDataDisplay from '../Components/FitDataDisplay';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function GoogleFit() {

    return (
        <>
            <GoogleOAuthProvider clientId="872238526034-s704pdne3nvpcf3j59i1vfjsesu8p7o1.apps.googleusercontent.com">
                <Navbar />
                <FitDataDisplay/>
            </GoogleOAuthProvider>
        </>
    )
}

export default GoogleFit;