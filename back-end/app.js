require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
//Access-Control-Allow-Methods CORS header
//Cross-Origin Resource Sharing
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cors());

//connected to the database
require("./ConnectionDatabase/connection");


/* USER REGISTRATION */
const userRoutes = require("./routes/users.js");
/* USER AUTHENTIFICATION */
const authRoutes = require("./routes/auth.js");
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


//start server
app.listen(8000, () => {
  console.log("Server Started");
});