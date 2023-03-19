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

app.use(cookieParser());

configCors = {
  origin: 'http://localhost:3000',
  credentials: true
}

//middlewares
app.use(cors(configCors));
app.use(express.json());
//the type of request data requested will be json
app.use(bodyParser.json());

//connected to the database
const databaseConnect = require("./config/database.js");
databaseConnect();

const PORT = process.env.PORT || 8000

//MIDDLEWARES
/* USER AUTHENTIFICATION */
const authRoutes = require("./routes/authRoute.js");
const messengerRoute = require('./routes/messengerRouter.js');
const teachingRoute = require('./routes/teachingRoute.js');
const todoRoute = require('./routes/todoRoute.js');
const calendarRoute = require('./routes/calendarRoute.js');

//middlewares
app.use('/api/uniwave', authRoutes);
app.use('/api/uniwave', messengerRoute);
app.use('/api/uniwave', teachingRoute);
app.use('/api/uniwave', todoRoute);
app.use('/api/uniwave', calendarRoute);

//start server
app.listen(PORT, () => {
  console.log("Server Started");
});