
const express=require('express');

const Machinerouter=express.Router();

const {recommendations}=require('../controller/Machine.controller');

Machinerouter.post('/recommendations',recommendations);

module.exports = Machinerouter;