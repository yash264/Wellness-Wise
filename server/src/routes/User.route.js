const express = require('express');

const UserRoute = express.Router();

const { login, register, verifyToken, getAllAnalysis, getHealthData } = require('../controller/User.controller');
const authenticateUser = require('../middleware/auth.middleware');

UserRoute.post('/login', login);
UserRoute.post('/register', register);
UserRoute.post('/verify-token',authenticateUser,verifyToken);
UserRoute.get("/analysis/:id",authenticateUser, getAllAnalysis);
UserRoute.get("/health/:id",authenticateUser,getHealthData);

module.exports = UserRoute;