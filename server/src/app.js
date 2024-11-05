const express = require("express");
const {google} = require('googleapis') ;
const {dotenv} = require('dotenv');

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
const { sendMail } = require("./middleware/SendMail");

const partials = require("partials");
const Machinerouter = require("./routes/Machine.route");
const UserRoute = require("./routes/User.route");
const PostRoute = require("./routes/Post.route");
const CommentRoute = require("./routes/Comment.route");

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
app.use("/api/posts",PostRoute)
app.use("/api/comment",CommentRoute)


// to send mail to a person
app.post("/api/sendMail",async(req,res)=>{
    try{
        const email = req.body.email;
        const name = req.body.name;
        const message = req.body.message;

        const notification = await sendMail(email,name,message);
        
        res.status(201).json("mail send");

    }catch(error){
        res.status(400).send(error);
    }
})
dotenv.config();
//const app = express();
const PORT = process.env.PORT || 5000;

// Set up the OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost:3000/callback'  // Change to your frontend's redirect URI
);

// Route to initiate the Google Fit authentication
app.get('/auth/google', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.body.read'
  ];
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(authUrl);
});

// Route to handle the OAuth callback
app.get('/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.json({ message: 'Authorization successful', tokens });
  } catch (error) {
    res.status(500).json({ error: 'Failed to exchange code for tokens' });
  }
});

// Route to fetch Google Fit data
app.get('/fit-data', async (req, res) => {
  try {
    const fitness = google.fitness({
      version: 'v1',
      auth: oauth2Client,
    });

    const response = await fitness.users.dataSources.list({
      userId: 'me',
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve data from Google Fit' });
  }
});





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