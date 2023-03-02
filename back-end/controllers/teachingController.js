const teachingSchema = require("../model/teachingModel.js");

module.exports.inputCourse = async (req, res) => {
  console.log(req.body);

  //const { senderName, receiverId, message } = req.body;
  // req.myId from authMiddleware
  //const senderId = req.myId;

  try {
    /* Insert Data in Messanger Model */
    /*const insertMessage = await teachingSchema.create({
      senderId: senderId,
      senderName: senderName,
      teachingTitle: {
        text: message,
      },
    });
    res.status(201).json({
      success: true,
      message: insertMessage,
    });*/
    res.status(201).json({
        success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};
