const express = require('express');

const UserRoute = express.Router();

const { login, register, verifyToken, getAllAnalysis, getHealthData } = require('../controller/User.controller');

UserRoute.post('/login', login);
UserRoute.post('/register', register);
UserRoute.post('/verify-token', verifyToken);
UserRoute.get("/analysis/:id",getAllAnalysis);
UserRoute.get("/health/:id",getHealthData);

module.exports = UserRoute;