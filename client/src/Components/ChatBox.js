import React from "react";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export default function ChatBox() {

    const [message, setMessage] = useState([])
    const [values, setValues] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', { model: 'gpt-3.5-turbo', messages: message }, {
                headers: {
                    'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                }
            });
            const transcript = response.data.choices[0].message;
            setValues(transcript);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button class="btn btn-outline-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" style={{ float: "right" }} >Help</button>

            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">AI Chat Box</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" onChange={(e) => setMessage(e.target.value)} placeholder="Enter your Name" />
                            <label for="floatingInput">Message </label>
                        </div>
                        <button type="submit" className="btn m-2 btn-outline-primary">Search</button>
                    </form>
                    <p>Your Message will display here</p>
                    {values}
                    <p>Try scrolling the rest of the page to see this option in action.</p>
                </div>
            </div>
        </>
    )
}