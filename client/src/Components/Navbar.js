import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("authToken");
        navigate("../User/login");
    }
  return (
      <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
          <div class="container-fluid">
              <a class="navbar-brand" href="/">WellNavi</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      <li class="nav-item">
                          <Link class="nav-link" to="/User/login/" >Dashboard</Link>
                      </li>
                      <li class="nav-item">
                          <Link class="nav-link" to="/User/healthGoal" >Health Goal</Link>
                      </li>
                      <li class="nav-item">
                          <Link class="nav-link" to="/User/googleFit" >Google Fit</Link>
                      </li>
                      <li class="nav-item">
                          <Link class="nav-link" to="/User/community" >Community</Link>
                      </li>
                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Profile
                          </a>
                          <ul class="dropdown-menu">
                              <Link class="nav-link" to="../User/update" >Update</Link>
                              <Link class="nav-link" to="../User/delete" >My Post</Link>
                          </ul>
                      </li>
                  </ul>
                  <div>
                      <button type="button" class="btn btn-outline-danger" onClick={logout}>Logout</button>
                  </div>
              </div>
          </div>
      </nav>
  )
}
