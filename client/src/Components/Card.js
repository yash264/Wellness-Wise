import axios from 'axios';
import React, { useState } from 'react'
import {Spinner} from './Spinner.js'
import { CommentModal } from './CommentBox.js';

export default function Card({ post }) {
    const [showComments, setShowComments] = useState(false);
    const [activePost, setActivePost] = useState(post);
    const [loading,setLoading]=useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onClose=()=>{
        setIsOpen(false);
    }

    const handleLike = async() => {
        setLoading(true);
        try {
            const response =await axios.post(`http://localhost:5000/api/posts/upvote/${activePost._id}`,{},
                {headers:{'Authorization': `Bearer ${localStorage.getItem('authToken')}`}});

                
                if(response.data.success){
                   setActivePost(response.data.data)
                
                }
            
        } catch (error) {
            console.log(error);
            
        }
      setLoading(false);
    };

    const handleDislike =async () => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:5000/api/posts/downvote/${activePost._id}`, {},
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } });

                
            if (response.data.success) {
                setActivePost(response.data.data)

            }

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleComment = () => {
        
    };

    const toggleComments = () => {
        setShowComments(showComments === true ? false : true);
    };

    console.log(post);
    
  return (
    
        <div  className="card m-3" style={{ width: "300px", height: "auto" }}>
            <div className="card-body m-0 p-0">

              {post.imageURL && <img src={post.imageURL} alt="Post" className="card-img-top mb-3" style={{ width: "100%", height: "200px" }} />}
               <p className='m-2'>By: {post.name}</p>
              <p className="card-text m-2">{post.caption}</p>

                <div className="d-flex justify-content-between m-2">
                    <div>
                        <button onClick={() => handleLike(post.id)} className="btn btn-sm btn-outline-success me-2">
                          {loading ? <Spinner /> : <> 👍 {activePost.upvote.length} </>}
                        
                        </button>
                        <button onClick={() => handleDislike(post.id)} className="btn btn-sm btn-outline-danger me-2">
                          {loading ? <Spinner /> : <>  👎 {activePost.downvote.length} </>}
                        
                        </button>
                      <button onClick={() => setIsOpen(true)} className="btn btn-sm btn-outline-danger me-2">
                          💬
                      </button>
                      <CommentModal isOpen={isOpen} onClose={onClose} postId={activePost._id}/>
                    </div>
                </div>

                {/* Comments Section */}
                {/* {showComments && (
                    <div className="mt-3">
                        <h6>Comments</h6>
                        <ul className="list-group mb-2">
                            {post.comment.length > 0 && post.comments.map((comment, index) => (
                                <li key={index} className="list-group-item d-flex align-items-center">
                                    <img src={comment.userImage} alt="User" className="rounded-circle me-2" width="40" height="40" />
                                    <strong className="me-2">{comment.userName}:</strong> {comment.text}
                                </li>
                            ))}
                        </ul>
                        <AddCommentForm onAddComment={(comment) => handleComment(post._id, comment)} />
                    </div>
                )} */}
            </div>
        </div>
  )
}


const AddCommentForm = ({ onAddComment }) => {
    const [comment, setComment] = useState("");
    const userImage = "https://via.placeholder.com/40";
    const userName = "CurrentUser";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onAddComment({ userImage, userName, text: comment });
            setComment("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex">
            <input
                type="text"
                className="form-control me-2"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
            />
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    );
};


