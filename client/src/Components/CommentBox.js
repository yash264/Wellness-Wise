import React, { useEffect, useState } from 'react';


export const getTimeStringComment = (timestamp) => {
    const currDate = new Date();
    const createdDate = new Date(timestamp);

    const diff = currDate.getTime() - createdDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return "now";
    } else if (minutes < 60) {
        return `${minutes} min`;
    } else if (hours < 24) {
        return `${hours}hr`;
    } else if (days < 7) {
        return `${days}d`;
    } else if (weeks < 4) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (months < 12) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        return `${years}yr${years > 1 ? 's' : ''} ago`;
    }
}

export const CommentModal = ({ isOpen,onClose,postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        if(isOpen){
            fetchComments();
        }
    }, [isOpen]);

    const fetchComments = async () => {
        const authToken = localStorage.getItem('authToken');
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/comment/${postId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
            });
            const res = await response.json();
            setLoading(false);
            setComments(res);
        } catch (err) {
            console.log("error" + err);
            setLoading(false);
        }
    };

    const handleAddComment = async () => {
        const authToken = localStorage.getItem('authToken');
        try {
            const commentData = {
                content: newComment,
            };
            await fetch(`http://localhost:5000/api/comment/${postId}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(commentData),
            });
            setNewComment('');
            fetchComments();
        } catch (error) {
            console.error('Error adding comment', error);
        }
    };

    const Comment = ({ comment, fetchComments }) => {
        const [showReplies, setShowReplies] = useState(false);
        const [newReply, setNewReply] = useState('');
        const [replyTo, setReplyTo] = useState(null);

        const handleAddReply = async (parentCommentId, replyToName) => {
            const authToken = localStorage.getItem('authToken');
            try {
                await fetch('http://localhost:5000/api/comment/reply/post', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify({
                        content: replyToName ? `@${replyToName} ${newReply}` : newReply,
                        parentCommentId: parentCommentId,
                    }),
                });
                setNewReply('');
                setReplyTo(null);
                fetchComments();
            } catch (error) {
                console.error("error" + error);
            }
        };

        return (
            <div className='mb-4'>
                <span className='font-weight-bold .fs-6'>{comment.name} <small style={{ fontWeight: "normal", fontSize: "0.75rem" }}>{getTimeStringComment(comment.timestamp)}</small></span>
                <span style={{display:"block"}}>{comment.content}</span>
                <button type='button' class="btn btn-white btn-sm" style={{ cursor: "pointer", backgroundColor: "white" }} onClick={() => setShowReplies(!showReplies)}>
                    {showReplies ? 'Hide Replies' : 'View Replies'}
                </button>

                {showReplies && (
                    <div className="mt-2 ps-4" style={{ borderLeft: "2px solid #EAEAEA" }}>
                        {comment.replies.map((reply) => (
                            <div key={reply._id} className='mt-2'>
                                <span className="fw-bold" style={{ fontSize: "13px" }}>{reply.name}:</span>
                                <span className='mt-2' style={{ fontSize: "13px" }}>
                                    {reply.content}
                                </span>

                                <button
                                    type='button'
                                    className='btn btn-white btn-sm'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setReplyTo(reply)}
                                >
                                    &#8212;Reply&#8212;
                                </button>
                            </div>
                        ))}

                        {(replyTo || newReply || showReplies) && (
                            <>
                                <input
                                    type='text'
                                    placeholder={`Reply to ${replyTo ? replyTo.name : comment.name}`}
                                    value={newReply}
                                    onChange={(e) => setNewReply(e.target.value)}
                                    style={{ marginTop: "0.5rem", border: "1px solid #EAEAEA" }}
                                />
                                <button
                                    type='button'
                                    className='btn btn-sm mt-2'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleAddReply(comment._id, replyTo ? replyTo.name : null)}
                                >
                                    Post
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <div class={`modal ${isOpen ?'show':'' }`} style={{ display: isOpen ?'block':'none' }} tabIndex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content" style={{ borderRadius: "25px" }}>
                        <div class="modal-header" style={{ justifyContent: "center" }}>
                            <h5 class="modal-title">Comments</h5>
                            <button type="button" class="close" onClick={onClose} aria-label="Close" style={{position:"absolute",top:"10px",right:"30px"}}>
                                <span aria-hidden="true" className=' fs-2 text-danger'>&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div style={{ maxHeight: "20rem", overflowY: "scroll", marginBottom: 0, width: "100%", padding: "16px", border: "3px solid #EAEAEA", borderRadius: "10px" }}>
                                {loading ? (
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "1.75rem", marginBottom: "1.75rem" }}>
                                        <div class="spinner-border" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    (Array.isArray(comments) && comments.length > 0 ? (
                                        comments.map((comment) => (
                                            <Comment key={comment._id} comment={comment} fetchComments={fetchComments} />
                                        ))
                                    ) : (
                                        <div style={{ display: "flex", justifyContent: "center", marginTop: "1.75rem", marginBottom: "1.75rem" }}>
                                            No comments under this post
                                        </div>
                                    ))
                                )}
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <textarea
                                    placeholder="Add a comment"
                                    style={{
                                        borderRadius: "4rem",
                                        height: "49px",
                                        padding: "20px",
                                        marginBottom: "15px",
                                        width: "100%", // You may adjust the width as needed
                                    }}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button class="btn btn-primary" style={{ height: "40px" }} onClick={handleAddComment}>
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};