
const express = require('express');

const PostRoute = express.Router();

const { getPagePost, createPost, getUserData, postUpvote, postDownvote, getUpDownVote, getAPost, fetchUserPosts, fetchUpvotedUserPosts, fetchDownvotedUserPosts, deletePost } = require('../controller/Post.controller');

PostRoute
.route('/page/:page')
.get(getPagePost);

// routes for post:
PostRoute
.route('/:id')
.post(createPost)
.delete(deletePost)

PostRoute
.route("/profile/:id")
.post(fetchUserPosts)
.get(getUserData);


// routes for up/downvotes:
PostRoute
.route('/upvote/:id')
.post(postUpvote)
.get(getUpDownVote);

PostRoute
.route('/downvote/:id')
.post(postDownvote);

module.exports = PostRoute;