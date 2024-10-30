const express = require('express');
const CommentRoute = express.Router();
const { createComments, getComments, postReply } = require('../controller/Comment.controller');

CommentRoute
.route('/:id')
.post(createComments)
.get(getComments);

CommentRoute
.route('/reply/post')
.post(postReply);


module.exports = CommentRoute;