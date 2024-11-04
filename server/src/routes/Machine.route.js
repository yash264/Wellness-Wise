
const express=require('express');

const Machinerouter=express.Router();

const {recommendations, burnout_detection}=require('../controller/Machine.controller');
const authenticateUser = require('../middleware/auth.middleware');

Machinerouter.post('/recommendations',authenticateUser,recommendations);
Machinerouter.post('/detect/burnout',authenticateUser,burnout_detection);

module.exports = Machinerouter;