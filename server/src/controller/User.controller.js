const axios = require("axios")
const user=require("../models/User.model")
const jwt=require("jsonwebtoken")
const dotenv=require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const userExists = await user.findOne({ email: email })
        
        if (userExists) {
            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if (isPasswordValid) {

                const token = jwt.sign(
                    { id: userExists._id, email: userExists.email },
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


module.exports = { login,register }