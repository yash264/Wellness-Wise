const axios = require("axios")
const personData = require("../models/schema");
const login = async (req, res) => {
    const { email, password } = req.body;
    personData.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password == password) {
                    res.json("success");
                }
                else {
                    res.json("Incorrect Password");
                }
            }
            else {
                res.json("Please Register");
            }
        })
        .catch(error => {
            console.log(error);
        })
}
const register = async (req, res) => {
    try {
        const type = "person";
        const ifExists = await personData.findOne({ type: type, email: req.body.email });
        if (ifExists) {
            res.status(201).json("Email Already Exists");
        }
        else {
            const registerPerson = new personData({
                type: type,
                name: req.body.name,
                gender: req.body.gender,
                email: req.body.email,
                password: req.body.password
            })
            const registered = await registerPerson.save();

            // to send mail to a person
            //const email = req.body.email;
            //const studentName = req.body.name;
            //registrationMail(email,studentName);

            res.status(201).json("registered");
        }
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = { login,register }