const signupModel = require("../model/authModel.js");
const messageModel = require("../model/messageModel.js");

const formidable = require("formidable");

module.exports.getFriends = async (req, res) => {
  // req.myId from authMiddleware
  const myId = req.myId;
  try {
    // get all the users
    const friendGet = await signupModel.find({});
    // filters out the currently logged in user by removing
    // all the users whose id property matches the value of myId
    const filterAllOutAuthUser = friendGet.filter(
      (userData) => userData.id !== myId
    );
    // send all users EXCEPT himself
    res.status(200).json({ success: true, friends: filterAllOutAuthUser });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};

module.exports.messageUploadDatabase = async (req, res) => {
  console.log(req.body);

  const { senderName, receiverId, message } = req.body;
  // req.myId from authMiddleware
  const senderId = req.myId;

  try {
    /* Insert Data in Messanger Model */
    const insertMessage = await messageModel.create({
      senderId: senderId,
      senderName: senderName,
      receiverId: receiverId,
      message: {
        text: message,
        image: "",
      },
    });
    res.status(201).json({
      success: true,
      message: insertMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};

/* GET USER CONVERSATIONS */
module.exports.getMessage = async (req, res) => {
  const myId = req.myId;
  const friendId = req.params.id;

  try {
    let getAllMessage = await messageModel.find({});

    /* ONLY MESSAGES THAT ARE BETWEEN THE TWO USERS */
    getAllMessage = getAllMessage.filter(
      (message) =>
        (message.senderId === myId && message.receiverId === friendId) ||
        (message.receiverId === myId && message.senderId === friendId)
    );

    //console.log(getAllMessage)

    res.status(200).json({
      success: true,
      message: getAllMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server error",
      },
    });
  }
};

//used for uploading the picture
const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Api_Key,
  api_secret: process.env.Api_Secret,
});

module.exports.ImageSend = (req, res) => {
  const form = formidable();

  form.parse(req, (err, fields, files) => {
    const { senderName, receiverId, imageName } = fields;
    console.log(fields)

    try {
      /* Upload Image on Cloudinary */
      /*cloudinary.uploader.upload(
        files.image.filepath,
        {
          resource_type: "auto",
        },
        function (error, result) {
          if (error) throw error;
          //console.log(result.url);
        }
      );*/
    } catch {}
  });
};
