const teachingSchema = require("../model/teachingModel.js");

module.exports.inputCourse = async (req, res) => {
  //console.log(req.myId); // req.myId from authMiddleware
  //console.log(req.body);

  const { senderId, senderName, senderEmail, senderImage, teachingTitle } = req.body;

  try {

    /* Insert Data in Teaching Course Model */
    const insertCourse = await teachingSchema.create({
      senderId: senderId,
      senderName: senderName,
      senderEmail: senderEmail,
      senderImage: senderImage,
      teachingTitle: teachingTitle,
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

module.exports.getCourse = async (req, res) => {
  // req.myId from authMiddleware
  const myId = req.myId;
  try {
    
    let courses = [];
    // Get all User except itself
    const courseGet = await teachingSchema.find({
      _id: {
        // The query is using the "$ne" (not equal) operator to retrieve
        // all documents except for the one with the matching "_id"
        $ne: myId,
      },
    });

    courses = [...courseGet]

    res.status(200).json({ success: true, courses: courses });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};