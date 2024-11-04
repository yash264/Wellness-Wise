
const express = require('express');

const PostRoute = express.Router();

const { getPagePost, createPost, getUserData, postUpvote, postDownvote, getUpDownVote, getAPost, fetchUserPosts, fetchUpvotedUserPosts, fetchDownvotedUserPosts, deletePost } = require('../controller/Post.controller');
const authenticateUser = require('../middleware/auth.middleware');

PostRoute
.route('/page/:page')
    .get(authenticateUser,getPagePost);

// routes for post:
PostRoute
.route('/:id')
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