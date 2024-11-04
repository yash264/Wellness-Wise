import React from "react";
import { ImLocation, ImEnvelop } from "react-icons/im";

function Footer() {

    return (
        <>
            <div style={{backgroundColor:"rgba(50, 50, 49, 0.953)"}} >
                <div className="container text-center p-3 ">
                    <div className="row">
                        <div className="col">
                            <h4 style={{color:"white"}} >Stay Connected to us</h4>
                            <p style={{color:"white"}} >Keep in touch for more Updates.</p>
                        </div>
                        <div className="col">
                        </div>
                        <div className="col-4 " style={{ textAlign: "left" }} >
                            <p style={{color:"white"}} ><ImEnvelop />  Team : Dev Designers</p>
                            <p style={{color:"white"}} ><ImLocation /> National Institute of Technology Allahabad</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;