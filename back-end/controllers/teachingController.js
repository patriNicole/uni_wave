const teachingSchema = require("../model/teachingModel.js");

module.exports.inputCourse = async (req, res) => {
  //console.log(req.myId); // req.myId from authMiddleware
  //console.log(req.body);

  const { senderId, senderName, senderEmail, senderImage, teachingTitle } = req.body;
  console.log(teachingTitle);

  try {

    /* Insert Data in Teaching Course Model */
    const insertCourse = await teachingSchema.create({
      senderId: senderId,
      senderName: senderName,
      senderEmail: senderEmail,
      senderImage: senderImage,
      courseDetails: {
        teachingTitle: teachingTitle,
      }
    });
    res.status(201).json({
      success: true,
      message: insertCourse,
    });

  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};
