const express = require('express');
const postRoutes = express.Router();
const authenticateUser = require('../middleware/auth.middleware')
const { getPagePost, createPost, getUserData, postUpvote, postDownvote, getUpDownVote, getAPost, fetchUserPosts, fetchUpvotedUserPosts, fetchDownvotedUserPosts, deletePost } = require('../controller/Post.controller');

// postRoutes.get('/', getAllPosts);

// to get a page posts
postRoutes
.route('/page/:page')
.get(authenticateUser, getPagePost);

// routes for post:
postRoutes
.route('/:id')
.post(authenticateUser, createPost)
.delete(authenticateUser, deletePost)

postRoutes
.route("/profile/:id")
.post(authenticateUser, fetchUserPosts)
.get(authenticateUser, getUserData);


// routes for up/downvotes:
postRoutes
.route('/upvote/:id')
.post(authenticateUser, postUpvote)
.get(authenticateUser, getUpDownVote);

postRoutes
.route('/downvote/:id')
.post(authenticateUser, postDownvote);


module.exports = postRoutes;