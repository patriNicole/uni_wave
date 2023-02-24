const signupModel = require("../model/authModel.js");
const messageModel = require("../model/messageModel.js");

const formidable = require("formidable");
const fs = require("fs");

const getFiendLastMessage = async (myId, friendId) => {
  // Get ONLY ONE MEssage 
  const message = await messageModel
    .findOne({
      $or: [
        {
          $and: [
            {
              senderId: {
                $eq: myId,
              },
            },
            // AND
            {
              receiverId: {
                $eq: friendId,
              },
            },
          ],
        },
        // OR
        {
          $and: [
            {
              senderId: {
                $eq: friendId,
              },
            },
            // AND
            {
              receiverId: {
                $eq: myId,
              },
            },
          ],
        },
      ],
    })
    // SORT messages descendent order
    .sort({
      updatedAt: -1,
    });

  return message
};

module.exports.getFriends = async (req, res) => {
  // req.myId from authMiddleware
  const myId = req.myId;
  try {
    /*
    // get all the users
    const friendGet = await signupModel.find({});
    // filters out the currently logged in user by removing
    // all the users whose id property matches the value of myId
    const filterAllOutAuthUser = friendGet.filter(
      (userData) => userData.id !== myId
    );
    // send all users EXCEPT himself
    res.status(200).json({ success: true, friends: filterAllOutAuthUser }); */

    let friend_messages = [];
    // Get all User except itself
    const friendGet = await signupModel.find({
      _id: {
        // The query is using the "$ne" (not equal) operator to retrieve
        // all documents except for the one with the matching "_id"
        $ne: myId,
      },
    });

    for (let i = 0; i < friendGet.length; i++) {
      // myId -> user logged in
      // friendGet[i].id -> Get that friend id
      let lastMessage = await getFiendLastMessage(myId, friendGet[i].id);
      //console.log(lastMessage)
      // Append all messages to the frien_messages array
      friend_messages = [...friend_messages, {
        friendInfo : friendGet[i],
        messageInfo : lastMessage
      }];
    }

    //console.log(friend_messages);
    res.status(200).json({ success: true, friends: friend_messages });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};

module.exports.messageUploadDatabase = async (req, res) => {
  //console.log(req.body);

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

    // MongoDB query language syntax for a logical OR operation between two subqueries
    // The query checks if either the sender and receiver IDs match the IDs of the
    // logged-in user and a friend's ID, or vice versa.
    $or: [
      {
        $and: [
          {
            senderId: {
              // If senderId equal to myId
              $eq: myId,
            },
          },
          // AND If receiverId equal to friendId
          {
            receiverId: {
              $eq: friendId,
            },
          },
        ],
      },
      // OR
      {
        $and: [
          {
            // If senderId equal to friendId
            senderId: {
              $eq: friendId,
            },
          },
          // AND
          {
            // If receiverId equal to myId
            receiverId: {
              $eq: myId,
            },
          },
        ],
      },
    ];

    /* ONLY MESSAGES THAT ARE BETWEEN THE TWO USERS */
    /*getAllMessage = getAllMessage.filter(
      (message) =>
        (message.senderId === myId && message.receiverId === friendId) ||
        (message.receiverId === myId && message.senderId === friendId)
    );*/

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

module.exports.ImageSend = async (req, res) => {
  // req.myId from authMiddleware
  const senderId = req.myId;
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    const { senderName, receiverId, imagename } = fields;

    try {
      /* Upload Image on Cloudinary */
      const { url } = await cloudinary.uploader.upload(files.image.filepath, {
        resource_type: "auto",
      });

      const insertMessage = await messageModel.create({
        senderId: senderId,
        senderName: senderName,
        receiverId: receiverId,
        message: {
          text: "",
          image: url,
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
  });
};
