import React, { useState } from 'react'

export default function Card({post}) {
    const [showComments, setShowComments] = useState(null);

    const handleLike = (id) => {
    };

    const handleDislike = (id) => {
    };

    const handleComment = (id, comment) => {
    };

    const toggleComments = (id) => {
        setShowComments(showComments === id ? null : id);
    };

  return (
    
        <div  className="card m-3" style={{ width: "300px", height: "auto" }}>
            <div className="card-body m-0 p-0">

                {post.imgUrl && <img src={post.imgUrl} alt="Post" className="card-img-top mb-3" style={{ width: "100%", height: "200px" }} />}

                <p className="card-text m-2">{post.text}</p>

                <div className="d-flex justify-content-between m-2">
                    <div>
                        <button onClick={() => handleLike(post.id)} className="btn btn-sm btn-outline-success me-2">
                            👍 {post.likes}
                        </button>
                        <button onClick={() => handleDislike(post.id)} className="btn btn-sm btn-outline-danger me-2">
                            👎 {post.dislikes}
                        </button>
                        <button onClick={() => toggleComments(post.id)} className="btn btn-sm btn-outline-primary">
                            💬 Comment
                        </button>
                    </div>
                </div>

                {/* Comments Section */}
                {showComments === post.id && (
                    <div className="mt-3">
                        <h6>Comments</h6>
                        <ul className="list-group mb-2">
                            {post.comments.map((comment, index) => (
                                <li key={index} className="list-group-item d-flex align-items-center">
                                    <img src={comment.userImage} alt="User" className="rounded-circle me-2" width="40" height="40" />
                                    <strong className="me-2">{comment.userName}:</strong> {comment.text}
                                </li>
                            ))}
                        </ul>
                        <AddCommentForm onAddComment={(comment) => handleComment(post.id, comment)} />
                    </div>
                )}
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


