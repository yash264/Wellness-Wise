const express = require("express");
const path = require("path");
const cors = require("cors");
const hbs = require("hbs");
const axios = require("axios")
const app = express();
//app.use(cors());
require("./db/connection");
const port = process.env.PORT || 5000;
const personData = require("./models/schema");
const partials = require("partials");

//  cors policy
const corsOptions ={
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}; 

app.use(cors(corsOptions));

const views_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",views_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/",(req,res)=>{
    res.render("index");
})

//  to register a person 
app.post("/register",async(req,res)=>{
    try{
        const type = "person";
        const ifExists = await personData.findOne({type:type,email:req.body.email});
        if(ifExists){
            res.status(201).json("Email Already Exists");
        }
        else{
            const registerPerson = new personData({
                type:type,
                name:req.body.name,
                gender:req.body.gender,
                email:req.body.email,
                password:req.body.password
            })
            const registered = await registerPerson.save();

            // to send mail to a person
            //const email = req.body.email;
            //const studentName = req.body.name;
            //registrationMail(email,studentName);

            res.status(201).json("registered");
        }
    }catch(error){
        res.status(400).send(error);
    }
})

//  to login a person
app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    personData.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password==password){
                res.json("success");
            }
            else{
                res.json("Incorrect Password");
            }
        }
        else{
            res.json("Please Register");
        }
    })
    .catch(error=>{
        console.log(error);
    })
})

// to fetch data to user profile
app.post("/dashboardData", async (req,res)=>{
    try{
        const email = req.body.email;
        const userData = await personData.findOne({email:email});
        if(userData){
            return res.status(200).json({userData});
        }
    }catch(error){
        console.log(error);
    }
})

app.post("/api/recommendations", async (req, res) => {
    try {
        const response = await axios.post("http://127.0.0.1:5001/api/recommendations", req.body);
        res.json(response.data);
        console.log(response);
        
    } catch (error) {
        res.status(500).send("Error fetching recommendations"+ error);
    }
});


app.listen(port,()=>{
    console.log(`Server is running at ${port}.`)
});