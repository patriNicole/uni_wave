const signupModel = require("../model/authModel.js");
const messageModel = require("../model/messageModel.js");

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
