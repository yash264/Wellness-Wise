// routes/goalRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { setGoal, logProgress, getStreaks } = require("../controller/GetGoal.controller");


// Routes for goal management
router.post("/setGoal", authMiddleware,setGoal);
router.post("/logProgress", authMiddleware, logProgress);
router.get("/streaks", authMiddleware, getStreaks);

module.exports = router;
