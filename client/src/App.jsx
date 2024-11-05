import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./User/Home";
import Register from "./User/Register";
import Login from "./User/Login";
import DashBoard from "./User/DashBoard";
import GoogleFit from "./User/GoogleFit";
import Community from "./User/Community";
import HealthGoal from "./User/HealthGoal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ChatBox from "./Components/ChatBox";
import Notification from "./Components/Notification";
import UserAnalysis from "./Components/UserAnalysis";
import FitDataDisplay from './FitDataDisplay';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>  
        <Route path="/User/register" element={<Register />}></Route> 
        <Route path="/User/login" element={<Login />}></Route>
        <Route path="/User/dashBoard/:id" element={<DashBoard />}></Route> 
        <Route path="/User/analysis/:id" element={<UserAnalysis />}></Route> 
        <Route path="/User/community/" element={<Community />}></Route>
        <Route path="/User/googleFit" element={<GoogleFit />}></Route>
        <Route path="/User/healthGoal" element={<HealthGoal />}></Route> 
        <Route path="/User/community/:id" element={<Community />}></Route> 
        
      </Routes> 
    </BrowserRouter>
    <ChatBox />
    </div>
  );
}

export default App;
