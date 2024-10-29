const express = require("express");
const path = require("path");
const cors = require("cors");
const hbs = require("hbs");
const axios=require("axios")
const app = express();
app.use(cors());
require("./db/connection");
const port = process.env.PORT || 5000;
const personData = require("./models/schema");
const partials = require("partials");

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