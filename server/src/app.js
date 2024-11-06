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
  origin: "http://localhost:3000",
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
app.use("/api/",Machinerouter)
app.use("/api/",UserRoute)
app.use("/api/posts",postRoutes)
app.use("/api/comment",CommentRoute)
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

/*app.post("/api/fitnessData", async (req, res) => {
  const { accessToken, requestData } = req.body;

  try {
    const response = await axios.post(
      "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/authGoogle",(req,res)=>{
  const oauth2Client = new google.auth.OAuth2(
    '839743569905-fhou8t32j4qutb5dsc2fu15tipubi539.apps.googleusercontent.com',
    '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',
    'http://localhost:3000/User/googleFit'  
  );

  const scopes = [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.body.read'
  ];
  
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: JSON.stringify({
      callbackUrl : req.body.callbackUrl,
      userId : req.body.userid
    })
  });

  request(authUrl,(error,response,body)=>{
    console.log("error" +error);
    console.log("status" + response.statusCode);
    res.json({authUrl});
  })
})


app.get('/getGoogleFit', async (req, res) => {
  try {
    const queryUrl = new urlParse(req.authUrl);
    const code = queryParse.parse(queryUrl.query).code;

    const oauth2Client = new google.auth.OAuth2(
      '839743569905-fhou8t32j4qutb5dsc2fu15tipubi539.apps.googleusercontent.com',
      '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',
      'http://localhost:3000/googleFit'  
    );

    const tokens = await oauth2Client.getToken(code);
    console.log(queryUrl,code,tokens);

    let stepArray = [];
    try{
      const result = await axios({
        method : "POST",
        headers:{
          authorization: "Bearer" + tokens.tokens.access_token
        },
        "Content-Type":"application/json",
        url : 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        data : {
          aggregateBy: [
            {
              dataTypeName: 'com.google.step_count.delta',
              dataSourceId: 'derieved:com.google.step_count.delta:com.google.android.gms:estimated_steps',
            }
          ],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: Date.now() - 7 * 24 * 60 * 60 * 1000,
          endTimeMillis: Date.now(),
        }
      })
      console.log(result);
    }
    catch(error){
      console.log(error);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to exchange code for tokens' });
  }
});*/

// Route to fetch Google Fit data
/*app.get('/fit-data', async (req, res) => {
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
});*/


app.listen(port, () => {
  console.log(`Server is running at ${port}.`)
});