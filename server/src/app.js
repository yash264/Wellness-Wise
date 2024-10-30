const express = require("express");
const path = require("path");
const cors = require("cors");
const hbs = require("hbs");
const axios = require("axios")
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//app.use(cors());
const DB=require("./db/connection");
DB();
const port = process.env.PORT || 5000;

const partials = require("partials");
const Machinerouter = require("./routes/Machine.route");
const UserRoute = require("./routes/User.route");

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


app.use("/api/",Machinerouter)
app.use("/api/",UserRoute)





// to fetch data to user profile
// app.post("/dashboardData", async (req,res)=>{
//     try{
//         const email = req.body.email;
//         const userData = await personData.findOne({email:email});
//         if(userData){
//             return res.status(200).json({userData});
//         }
//     }catch(error){
//         console.log(error);
//     }
// })



app.listen(port,()=>{
    console.log(`Server is running at ${port}.`)
});