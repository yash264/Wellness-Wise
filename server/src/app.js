const express = require("express");
const app = express();
const path = require("path");
const PORT = require("port");
const port = process.env.PORT || 5000;
const hbs = require("hbs");
require("./db/connection");
const personData = require("./models/schema");
const partials = require("partials");

const views_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",views_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}.`)
});