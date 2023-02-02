const mongoose = require("mongoose");

const mongourl = process.env.DB;

const databaseConnect = () => {
  mongoose.connect(mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database successfully");
    })
    .catch((error) => {
      console.log("Error connecting to the database");
    });
};

module.exports = databaseConnect;
