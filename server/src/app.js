const express = require("express");
const {google} = require('googleapis') ;
const dotenv = require('dotenv');
const path = require("path");
const cors = require("cors");
const hbs = require("hbs");
const axios = require("axios")
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const request = require("request");
const urlParse = require('url-parse');
const queryParse = import('query-string');
const DB = require("./db/connection");
DB();
const port = process.env.PORT || 5000;
const { sendMail } = require("./middleware/SendMail");

const partials = require("partials");
const Machinerouter = require("./routes/Machine.route");
const UserRoute = require("./routes/User.route");
const postRoutes = require("./routes/Post.route");
const CommentRoute = require("./routes/Comment.route");
const { aggregate } = require("./models/User_Health.model");
const SetGoalRoute = require("./routes/SetGoal.route");


//  cors policy
const corsOptions = {
  origin: ["*","http://localhost:3000"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.render("index");
})



app.use("/api/", Machinerouter)
app.use("/api/", UserRoute)
app.use("/api/posts", postRoutes)
app.use("/api/comment", CommentRoute)
app.use("/goals/",SetGoalRoute)



// to send mail to a person
app.post("/api/sendMail", async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const message = req.body.message;

    const notification = await sendMail(email, name, message);

    res.status(201).json("mail send");

  } catch (error) {
    res.status(400).send(error);
  }
})

app.get("/api/youtube", async (req, res) => {
  const query = req.query.q; 
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: "snippet",
        q: query,
        key: process.env.YOUTUBE_API_KEY,
        maxResults: 20,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.message);
  }
});


app.listen(port, () => {
  console.log(`Server is running at ${port}.`)
});