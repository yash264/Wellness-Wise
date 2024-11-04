import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("authToken");
        navigate("/");
    }
  return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
          <div className="container-fluid">
              <a className="navbar-brand" href="/">WellNavi</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          <Link className="nav-link" to="/User/login/" >Dashboard</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="/User/healthGoal" >Health Goal</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="/User/googleFit" >Google Fit</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="/User/community" >Community</Link>
                      </li>
                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Profile
                          </a>
                          <ul className="dropdown-menu">
                              <Link className="nav-link" to="../User/update" >Update</Link>
                              <Link className="nav-link" to="../User/post" >My Post</Link>
                          </ul>
                      </li>
                  </ul>
                  <div>
                      <button type="button" className="btn btn-outline-danger" onClick={logout}>Logout</button>
                  </div>
              </div>
          </div>
      </nav>
  )
}
