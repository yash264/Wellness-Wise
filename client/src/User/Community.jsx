import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../Components/Card';
import Navbar from '../Components/Navbar';

const Community = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            text: "This is the first post!",
            imgUrl: "https://via.placeholder.com/150",
            likes: 0,
            dislikes: 0,
            comments: [{ userImage: "https://via.placeholder.com/40", userName: "User1", text: "Nice post!" }]
        },
        {
            id: 2,
            text: "Here's another post!",
            imgUrl: "https://via.placeholder.com/150",
            likes: 0,
            dislikes: 0,
            comments: [{ userImage: "https://via.placeholder.com/40", userName: "User2", text: "Great content!" }]
        },
    ]);

  
    const [showModal, setShowModal] = useState(false);
    const [newPostText, setNewPostText] = useState("");
    const [newPostImgFile, setNewPostImgFile] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPostImgFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreatePost = () => {
        const newPost = {
            id: posts.length + 1,
            text: newPostText,
            imgUrl: newPostImgFile || "https://via.placeholder.com/150", // Default image if none provided
            likes: 0,
            dislikes: 0,
            comments: []
        };
        setPosts([newPost, ...posts]);
        setShowModal(false);
        setNewPostText("");
        setNewPostImgFile(null);
    };

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
            {posts.map(post => (
              <Card post={post} key={post.id}/> 
            ))}
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
                                <button type="button" className="btn btn-primary" onClick={handleCreatePost}>Post</button>
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