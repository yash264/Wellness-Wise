
const express = require('express');

const UserRoute = express.Router();

const { login, register } = require('../controller/User.controller');

UserRoute.post('/login', login);
UserRoute.post('/register', register);

module.exports = UserRoute;