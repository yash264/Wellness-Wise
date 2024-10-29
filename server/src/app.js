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
const Machinerouter = require("./routes/Machine.route");

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

app.listen(port,()=>{
    console.log(`Server is running at ${port}.`)
});