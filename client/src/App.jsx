import React from "react";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./User/Home";
import Register from "./User/Register";
import Login from "./User/Login";
import DashBoard from "./User/DashBoard";
import HealthTips from "./User/HealthTips";
import Community from "./User/Community";
import HealthGoal from "./User/HealthGoal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ChatBox from "./Components/ChatBox";
import Update from "./User/Update";
import UserAnalysis from "./Components/UserAnalysis";
import MyPost from "./User/MyPost";

function App() {
  return (
    
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>  
        <Route path="/User/register" element={<Register />}></Route> 
        <Route path="/User/login" element={<Login />}></Route>
        <Route path="/User/dashBoard/:id" element={<DashBoard />}></Route> 
        <Route path="/User/analysis/:id" element={<UserAnalysis />}></Route> 
        <Route path="/User/community/" element={<Community />}></Route>
        <Route path="/User/healthTips" element={<HealthTips />}></Route>
        <Route path="/User/healthGoal" element={<HealthGoal />}></Route> 
        <Route path="/User/community/:id" element={<Community />}></Route> 
        <Route path="/User/update" element={<Update />}></Route>
        <Route path="/User/myPost" element={<MyPost />}></Route>
      </Routes> 
      
    
    <ChatBox />
    </div>
    
  );
}

export default App;
