const mongoose = require("mongoose");

const userSchemaInformations = mongoose.Schema({
    username: String,
    email: String,   
}, {
    collection: "UserInformation"
});

//create a Model by passing the collection name and the schema
mongoose.model("UserInformation", userSchemaInformations);