const mongoose = require("mongoose");

const mongourl = "mongodb+srv://patri:Nicole28patricia@cluster0.t7uqm6m.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongourl, {
    useNewUrlParser:true
}).then(() => {
    console.log("Connected to the database");
}).catch(error => {
    console.log(error);
});