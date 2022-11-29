const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

//connected to the database
require("./ConnectionDatabase/connection");

app.listen(8000, () => {
  console.log("Server Started");
});

/* USER REGISTRATION */
//Import the user schema
require("./SignUp/userSchema");
//access User Model
const User = mongoose.model("UserInformation");
//POST call to the API
app.post("/register", async (req, res) => {

  //in order to register, require data from user
  //destructioring
  const {userName, email} = req.body;
  try {
    await User.create({
        username: userName,
        email: email
    })
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Something went wrong. Try again." });
  }
});