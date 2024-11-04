
const express = require('express');

const PostRoute = express.Router();

const { getAllPosts, createPost, getUserData, postUpvote, postDownvote, getUpDownVote, getAPost, fetchUserPosts, fetchUpvotedUserPosts, fetchDownvotedUserPosts, del, getAllPostsetePost, deletePost } = require('../controller/Post.controller');
const authenticateUser = require('../middleware/auth.middleware');

PostRoute
.route('/')
    .get(authenticateUser,getAllPosts);

// routes for post:
PostRoute
.route('/post')
.post(authenticateUser,createPost)
.delete(authenticateUser,deletePost)

PostRoute
.route("/profile/:id")
.post(authenticateUser,fetchUserPosts)
.get(authenticateUser,getUserData);


// routes for up/downvotes:
PostRoute
.route('/upvote/:id')
.post(authenticateUser,postUpvote)
.get(authenticateUser,getUpDownVote);

PostRoute
.route('/downvote/:id')
.post(authenticateUser,postDownvote);

module.exports = PostRoute;