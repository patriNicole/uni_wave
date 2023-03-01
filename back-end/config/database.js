const mongoose = require("mongoose");
const { ServerApiVersion } = require('mongodb');

const mongourl = process.env.DB;

const databaseConnect = async () => {
  try {
    await mongoose.connect(mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1 
    });
    console.log("Connected to the database successfully");
  } catch (error) {
    console.log("Error connecting to the database: ", error.message);
  }
};

module.exports = databaseConnect;
