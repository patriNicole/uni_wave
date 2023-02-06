const express = require("express");
const app = express();

//Access-Control-Allow-Methods CORS header
//Cross-Origin Resource Sharing
const cors = require("cors");

//loads environment variables from a .env 
//file into process.env
const dotenv = require('dotenv');
dotenv.config({
  path : './config/config.env'
});

//handling HTTP POST request data
//parses the incoming request bodies in a middleware before the handlers
const bodyParser = require('body-parser');
//parses the cookies attached to an HTTP request 
//and populates the req.cookies object with key-value pairs
const cookieParser = require('cookie-parser');

//middlewares
app.use(cors());
app.use(express.json());

//connected to the database
const databaseConnect = require("./config/database.js");
databaseConnect();

const PORT = process.env.PORT || 8000

//MIDDLEWARES
/* USER AUTHENTIFICATION */
const authRoutes = require("./routes/authRoute.js");
app.use('/api/uniwave', authRoutes);
//the type of request data requested will be json
app.use(bodyParser.json());
app.use(cookieParser());

//start server
app.listen(PORT, () => {
  console.log("Server Started");
});