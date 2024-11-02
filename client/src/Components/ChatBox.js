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
            const API_KEY = process.env.OPEN_API_KEY;
            console.log(API_KEY);

            const response = await fetch('https://api.openai.com/v1/chat/completions',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: "gpt-4o-mini",
                        messages: [{ role: "user", content: "Generate a list of instructions for " + message + " and Use '\n' to indicate each new line." }],
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
            <button class="btn btn-round btn-outline-success chatbox-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" style={{ float: "right" }} ><i class="fa-solid fa-microchip"></i> </button>

            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">AI Chat Box</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" onChange={(e) => setMessage(e.target.value)} placeholder="Enter your Queries" />
                            <label for="floatingInput">Message </label>
                        </div>
                        <button type="submit" className="btn m-2 btn-outline-success">Search  < FaSearch /></button>
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