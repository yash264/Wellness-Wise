const express = require('express');

const UserRoute = express.Router();

const { login, register, verifyToken, getAllAnalysis, getHealthData, getUser, updateUser } = require('../controller/User.controller');
const authenticateUser = require('../middleware/auth.middleware');

UserRoute.post('/login', login);
UserRoute.post('/register', register);
UserRoute.get('/getUser',authenticateUser, getUser);
UserRoute.put('/updateUser',authenticateUser, updateUser);
UserRoute.post('/verify-token',authenticateUser,verifyToken);
UserRoute.get("/analysis/:id",authenticateUser, getAllAnalysis);
UserRoute.get("/health/:id",authenticateUser,getHealthData);

module.exports = UserRoute;