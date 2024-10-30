const express = require('express');

const UserRoute = express.Router();

const { login, register, verifyToken, getAllAnalysis } = require('../controller/User.controller');

UserRoute.post('/login', login);
UserRoute.post('/register', register);
UserRoute.post('/verify-token', verifyToken);
UserRoute.get("/analysis/:id",getAllAnalysis);

module.exports = UserRoute;