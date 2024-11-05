import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


 
export default function ChatBox() {

    const [message, setMessage] = useState([])
    const [values, setValues] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const API_KEY = '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';
            const API_KEY = process.env.REACT_APP_OPEN_API_KEY;
            
            

            const response = await fetch('https://api.openai.com/v1/chat/completions',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.REACT_APP_OPEN_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: "gpt-4o-mini",
                        messages: [{ role: "user", content:  message + " .In under 150 words" }],
                        max_tokens: 150,
                    })
                });

            if (response.ok) {
                const data = await response.json();   // Extract JSON data here
                const transcript = data.choices[0].message.content;
                console.log(transcript);
                const formattedText = transcript.replace(/\n/g, "<br/>");

                setValues(formattedText);
            } else {
                console.log("Error Occured");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button className="btn btn-round btn-outline-success chatbox-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" style={{ float: "right" }} ><i className="fa-solid fa-microchip"></i> </button>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">AI Chat Box</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body ">
                    <form onSubmit={handleSubmit} className="d-flex flex-row">
                        <div className="form-floating mb-3" style={{ width: "90%" }}>
                            <textarea type="text" className="form-control" onChange={(e) => setMessage(e.target.value)} placeholder="Enter your Queries" />
                            <label for="floatingInput">Message </label>
                        </div>
                        <button type="submit" className="btn mb-3 btn-success border-0 send-btn"><i className="fa-solid fa-circle-chevron-right"></i></button>
                    </form>
                    <p>Your Message will display here</p>
                    <div
                        dangerouslySetInnerHTML={{ __html: values }}
                    ></div>
                </div>
            </div >
        </>
    )
}
