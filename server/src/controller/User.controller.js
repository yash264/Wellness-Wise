const axios = require("axios")
const user=require("../models/User.model")
const jwt=require("jsonwebtoken")
const dotenv=require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
const Analysis = require("../models/Analysis.model");
const Health = require("../models/User_Health.model");
const { default: mongoose } = require("mongoose");
const userModel = require("../models/User.model");
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const userExists = await user.findOne({ email: email })
        
        
        if (userExists) {
            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if (isPasswordValid) {

                const token = jwt.sign(
                    { id: userExists._id, email: userExists.email, name: userExists.name },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' } // Token expires in 1 day
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                });
                res.status(201).json({
                    success: true,
                    token: token,
                    id: userExists._id,
                    message: "success",
                    password: userExists.password
                });
            }
            else {
                res.status(201).json({
                    success: false,
                    message: "Incorrect Password"
                });
            }
        }
        else {
            res.status(201).json({
                success: false,
                message: "Please Register"
            });
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            message: ""+error
        });
    }   
}
const register = async (req, res) => {
    try {
        const ifExists = await user.findOne({ email: req.body.email });
        if (ifExists) {
            res.status(201).json({
                success: false,
                message: "Email Already Exists"
            });
        }
        else {
            const registerPerson = await user.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            res.status(201).json({
                success: true,
                message: "Registered"
            });
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            message: ""+error
        });
    }
}

const verifyToken=async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ valid: false,data:null});

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ valid: false ,data:null});
        return res.json({ valid: true ,data:decoded.id});
    });
}

const getUser=async(req,res)=>{
    try{

        const user = await userModel.findById(req.user.id).select("-password -Health -Goals -Analysis "); 

        res.status(200).json({
            success: true,
            data:user
        });
    }catch(error){
        res.status(400).send({
            success: false,
            message: ""+error
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.status(201).json({
            success: true,
            data: updatedUser
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: ""+error
        });
    }
}


const getAllAnalysis = async (req, res) => {
    try {
        const analysis = await Analysis.find({ userID: req.params.id })
        res.status(201).json({
            success: true,
            analysis: analysis
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: ""+error
        });
    }
}



const getHealthData = async (req, res) => {
    const userID = req.params.id;
    
    try {
        // Fetch data and group it by date
        const healthData = await Health.aggregate([
            { $match: { userID: new mongoose.Types.ObjectId(userID) } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    avgActivity: { $avg: "$activity" },
                    avgNutrition: { $avg: "$nutrition" },
                    avgSleep: { $avg: "$sleep" },
                    avgStressLevel: { $avg: "$stress_level" },
                    mood: { $push: "$mood" }
                }
            },
            { $sort: { _id: 1 } } // Sort by date
        ]);

        res.status(200).json({
            success: true,
            data:healthData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching data"+error
            });
    }
};



module.exports = { login, register, verifyToken, getAllAnalysis, getHealthData,getUser,updateUser }