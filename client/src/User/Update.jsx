import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MainNavbar from "../Components/MainNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Update() {

    const params = useParams()
    const id = params.id;

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dznwp1clo';
    const upload_preset=process.env.REACT_APP_UPLOAD_PRESET || 'wellnavi';


    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:5000/api/updateUser/`, { name: name,email: email,pic: imageUrl }, {
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setImageUrl(data.secure_url);
        } catch (error) {
            console.error("Error uploading:", error);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {

        axios.get(`http://localhost:5000/api/getUser`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        }).then((response) => {
            setName(response.data.data.name)
            setEmail(response.data.data.email)
            setImageUrl(response.data.data.pic)
        })
    }, [id])


    return (
        <div>

            <MainNavbar />
            <br /><br /><br />
            
            <div class="container px-4 text-center">
                <form class="row g-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <img src={imageUrl} alt="Profile Picture" id="profilePic" class="profile-pic" style={{width:"100px"}} />
                        <br/><br/>
                        <input
                            type="file"
                            id="profilePic"
                            className="form-control"
                            onChange={handleImageUpload}
                            disabled={uploading}
                        />
                        {uploading && <div className="spinner-border text-primary mt-2" role="status">
                            <span className="visually-hidden">Uploading...</span>
                        </div>}
                    </div>

                    <div class="col-md-5">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" value={name} />
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