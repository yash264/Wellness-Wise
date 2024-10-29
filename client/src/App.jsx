import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./User/Home";
import Register from "./User/Register";
import Login from "./User/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>  
        <Route path="/User/register" element={<Register />}></Route> 
        <Route path="/User/login" element={<Login />}></Route> 
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
