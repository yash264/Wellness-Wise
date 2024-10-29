import React from "react";
import { Link } from "react-router-dom";

function Home () {
    return (
        <>
        <h3>Welcome to Client Side</h3>
        <nav class="navbar navbar-expand-lg bg-body-tertiary"  >
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Services</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link" to="./User/register">User</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Home;