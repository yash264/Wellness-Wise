import React, { useState ,useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../Components/Card';
import MainNavbar from '../Components/MainNavbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const MyPost = () => {
    const [posts, setPosts] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [userId, setUserId] = useState('');
    const isInitialLoad = useRef(true);
    const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const upload_preset=process.env.REACT_APP_UPLOAD_PRESET;

    const fetchPosts = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/posts/profile`,
            {
                page: page,
                tab: 0
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-type': 'application/json'
                }
            });
            setUserId(response.data.userId);

            if (response.data.data.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
                setPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        }
    };


  
    // useEffect(() => {
    //     fetchPosts(); 
    // }, []);
    useEffect(() => {
        if (isInitialLoad.current) {
            fetchPosts();
            isInitialLoad.current = false;
        }
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = posts.filter(post =>
                post.caption.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);
        }
    }, [posts, searchTerm]);

  
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

            setPosts((prevPosts) => [response.data.data, ...prevPosts]);
        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
        setNewPostText("");
        setImageUrl("");
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>Create Post</button>
            </div>

            <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchPosts}
                    hasMore={hasMore}
                    // loader={<h4>Loading...</h4>}
                    endMessage={<p style={{ textAlign: 'center' }}>No more posts</p>}
                >
                    <div className="d-flex flex-row flex-wrap">
                        {filteredPosts.length > 0 && filteredPosts.map(post => {
                            const isLiked = post.upvote.indexOf(userId);
                            const isDisliked = post.downvote.indexOf(userId);

                            return (
                                <Card
                                    key={post._id}
                                    post={post}
                                    isLiked={isLiked}
                                    isDisliked={isDisliked}
                                />
                            );
                        })}
                    </div>
                </InfiniteScroll>
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

export default MyPost;
