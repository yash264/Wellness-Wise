import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MainNavbar from "../Components/MainNavbar";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Update() {

    const params = useParams()
    const id = params.id;

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
  

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:5000/api/updateUser/`, { name, email }, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        }).then((response) => {
           setName(response.data.data.name)
           setEmail(response.data.data.email)
           toast.success('User Updated Successfully')
        })
        }
       
    

    useEffect(()=>{

        axios.get(`http://localhost:5000/api/getUser`,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        }).then((response) => {
            setName(response.data.data.name)
            setEmail(response.data.data.email)
        })
    },[id])

  

    return (
        <div>
            
            <MainNavbar />
            <br/><br/><br/>

            <div class="container px-4 text-center">
                <form class="row g-3" onSubmit={handleSubmit}>
                    
                    <div class="col-md-5">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" value={name}     />
                    </div>

 
                    <div class="col-md-5">
                        <label for="city" class="form-label">Email</label>
                        <input type="text" class="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" value={email} />
                    </div>
                   
                    <div class="col-12">
                        <button type="submit" class="btn btn-outline-primary">Update</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Update;