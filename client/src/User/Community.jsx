import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../Components/Card';
import Navbar from '../Components/Navbar';
import axios from 'axios';



const Community = () => {
    const [posts, setPosts] = useState([]);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    // const fetchPosts = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/api/posts',{
    //             headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //             }
    //         });

    //         setPosts(response.data.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const url = `https://api.cloudinary.com/v1_1/dznwp1clo/image/upload`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "wellnavi");

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            console.log("Uploaded successfully:", data);
            setImageUrl(data.secure_url);
        } catch (error) {
            console.error("Error uploading:", error);
        } finally {
            setUploading(false);
        }
    };
      

        // useEffect(() => {
        //     fetchPosts();
        // }, []);

        const [showModal, setShowModal] = useState(false);
        const [newPostText, setNewPostText] = useState("");
        const [newPostImgFile, setNewPostImgFile] = useState(null);


        // const handleCreatePost =async () => {
        //     try {
        //         const response = await axios.post('http://localhost:5000/api/posts/post', { caption: newPostText, imageURL: newPostImgFile }, {
        //             headers: {
        //                 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        //             }
        //         });

        //         setPosts(response.data.data);
        //     } catch (error) {
        //         console.error(error);
        //     }
        //     setShowModal(false);
        //     setNewPostText("");
        //     setNewPostImgFile(null);

        // };

        return (
            <>
                <Navbar />
                <div className="container mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <input
                            type="text"
                            className="form-control w-50 mx-auto"
                            placeholder="Search..."
                        />
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Create Post</button>
                    </div>

                    <div className='d-flex flex-row flex-wrap'>
                        {/* {posts.length>0 && posts.map(post => ( */}
                        <Card post={'ra'} key={'alala'} />
                        {/* ))} */}
                    </div>
                    {/* Create Post Modal */}
                    {showModal && (
                        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Create New Post</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="postText" className="form-label">Post Text</label>
                                            <textarea
                                                id="postText"
                                                className="form-control"
                                                rows="3"
                                                value={newPostText}
                                                onChange={(e) => setNewPostText(e.target.value)}
                                                placeholder="What's on your mind?"
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="postImgFile" className="form-label">Upload Image</label>
                                            <input
                                                type="file"
                                                id="postImgFile"
                                                className="form-control"
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                        {/* <button type="button" className="btn btn-primary" onClick={handleCreatePost}>Post</button> */}
                                        <button type="button" className="btn btn-primary">Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    };

    export default Community;
