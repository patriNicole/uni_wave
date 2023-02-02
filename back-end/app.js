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
})

//middlewares
app.use(cors());
app.use(express.json());

//connected to the database
const databaseConnect = require("./config/database.js");
databaseConnect();

const PORT = process.env.PORT || 8000
app.get('/', (req, res)=>{
  res.send('This is from backend Sever')
})

//MIDDLEWARES
/* USER AUTHENTIFICATION */
const authRoutes = require("./routes/authRoute.js");
app.use('/api/uniwave', authRoutes);

//start server
app.listen(PORT, () => {
  console.log("Server Started");
});