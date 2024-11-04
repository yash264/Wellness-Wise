const express = require('express');
const CommentRoute = express.Router();
const { createComments, getComments, postReply } = require('../controller/Comment.controller');
const authenticateUser = require('../middleware/auth.middleware');

CommentRoute
.route('/:id')
    .post(authenticateUser,createComments)
    .get(authenticateUser,getComments);

CommentRoute
.route('/reply/post')
    .post(authenticateUser,postReply);


module.exports = CommentRoute;