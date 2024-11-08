import React, { useState ,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../Components/Card';
import MainNavbar from '../Components/MainNavbar';
import axios from 'axios';

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [newUpload, setNewUpload] = useState(false);
    const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const upload_preset=process.env.REACT_APP_UPLOAD_PRESET;

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/posts/page/1`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            setPosts(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };


  
    useEffect(() => {
        fetchPosts();

    }, []);
    useEffect(() => {
        fetchPosts();

    }, [newUpload]);
  
    const [showModal, setShowModal] = useState(false);
    const [newPostText, setNewPostText] = useState("");

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



    const handleCreatePost =async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/posts/', { caption: newPostText, imageURL: imageUrl }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            setPosts(response.data.data);
        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
        setNewPostText("");
        setImageUrl("");
        setNewUpload((prev) => (!prev));
    };

    return (
        <>
        <MainNavbar />
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
                {posts.length>0 && posts.map(post => (
                <Card post={post} key={post._id}/> 
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
                                        disabled={uploading}
                                    />
                                    {uploading && <div className="spinner-border text-primary mt-2" role="status">
                                        <span className="visually-hidden">Uploading...</span>
                                    </div>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" disabled={uploading || !imageUrl || !newPostText} onClick={handleCreatePost} >Post</button>
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
