const express = require('express');

const UserRoute = express.Router();

const { login, register, verifyToken } = require('../controller/User.controller');

UserRoute.post('/login', login);
UserRoute.post('/register', register);
UserRoute.post('/verify-token', verifyToken);

module.exports = UserRoute;