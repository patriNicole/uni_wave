const teachingSchema = require("../model/teachingModel.js");
const formidable = require("formidable");

module.exports.inputCourse = async (req, res) => {
  //console.log(req.myId); // req.myId from authMiddleware
  //console.log(req.body);

  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    const {
      senderId,
      senderName,
      senderEmail,
      senderImage,
      teachingTitle,
      teachingOverview,
      teachingFileText,
      teachingVideoText
    } = fields;

    const {
      teachingFile,
      teachingVideo
    } = files;

    try {
      /* Insert Data in Teaching Course Model */
      const insertCourse = await teachingSchema.create({
        senderId: senderId,
        senderName: senderName,
        senderEmail: senderEmail,
        senderImage: senderImage,
        teachingTitle: teachingTitle,
        teachingOverview: teachingOverview,
        teachingFiles: {
          teachingFile: teachingFile,
          teachingFileText: teachingFileText
        },
        teachingVideos: {
          teachingVideo: teachingVideo,
          teachingVideoText: teachingVideoText
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
  });
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

    courses = [...courseGet];

    res.status(200).json({ success: true, courses: courses });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};

module.exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  //console.log(courseId)
  try {
    // Delete the course with the specified courseId
    await teachingSchema.findByIdAndDelete(courseId);

    // Get all remaining courses
    const courses = await teachingSchema.find();

    // Send the remaining courses as a response to frontend
    res.status(200).json({ success: true, courses: courses });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false, error: "Unable to delete course" });
  }
};

module.exports.updateCourse = async (req, res) => {
  const courseId = req.params.id;
  const updatedCourse = req.body;
  //console.log(courseId, updatedCourse)

  try {
    // Find the course with the specified courseId and update its properties
    const course = await teachingSchema.findByIdAndUpdate(
      courseId,
      updatedCourse,
      { new: true }
    );

    // Send the updated course as a response to frontend
    res.status(200).json({ success: true, course: course });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false, error: "Unable to update course" });
  }
};
