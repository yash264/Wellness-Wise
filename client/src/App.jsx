import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./User/Home";
import Register from "./User/Register";
import Login from "./User/Login";
import DashBoard from "./User/DashBoard";
import DataLogging from "./User/DataLogging";
import HealthGoal from "./User/HealthGoal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>  
        <Route path="/User/register" element={<Register />}></Route> 
        <Route path="/User/login" element={<Login />}></Route>
        <Route path="/User/dashBoard/:email" element={<DashBoard />}></Route> 
        <Route path="/User/dataLogging/:email" element={<DataLogging />}></Route>
        <Route path="/User/healthGoal/:email" element={<HealthGoal />}></Route> 
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
