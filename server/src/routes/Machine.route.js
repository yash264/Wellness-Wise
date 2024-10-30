
const express=require('express');

const Machinerouter=express.Router();

const {recommendations, burnout_detection}=require('../controller/Machine.controller');

Machinerouter.post('/recommendations',recommendations);
Machinerouter.post('/detect/burnout',burnout_detection);

module.exports = Machinerouter;