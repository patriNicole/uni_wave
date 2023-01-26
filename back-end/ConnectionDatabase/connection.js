const mongoose = require("mongoose");

const mongourl = process.env.DB;
mongoose.connect(mongourl, {
    useNewUrlParser:true
}).then(() => {
    console.log("Connected to the database successfully");
}).catch(error => {
    console.log("Error connecting to the database");
});