const calendarSchema = require("../model/calendarModel.js");

module.exports.inputCalendar = async (req, res) => {
  // req.myId from authMiddleware
  const myCalendar = req.body;
  //console.log(myCalendar);
  try {
    const insertCalendar = await calendarSchema.create({
      senderId: myCalendar.senderId,
      senderName: myCalendar.senderName,
      title: myCalendar.title,
      start: myCalendar.start,
      end: myCalendar.end,
      allDay: myCalendar.allDay
    });

    res.status(200).json({ success: true, calendarList: insertCalendar });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
}; 

module.exports.getCalendar = async (req, res) => {
  // req.myId from authMiddleware
  const myId = req.myId;
  try {
    let calendarList = [];
    // Get all calendar items
    const calendarGet = await calendarSchema.find({
      _id: {
        // The query is using the "$ne" (not equal) operator to retrieve
        // all documents except for the one with the matching "_id"
        $ne: myId,
      },
    });

    calendarList = [...calendarGet];

    res.status(200).json({ success: true, calendarList: calendarList });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};

module.exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  //console.log(id)
  try {
    // Delete the todolist with the specified id
    await calendarSchema.findByIdAndDelete(id);

    // Get all remaining todos
    const events = await calendarSchema.find();

    // Send the remaining todos as a response to frontend
    res.status(200).json({ success: true, calendarList: events });
  } catch (error) {
    //console.log(error);
    res
      .status(500)
      .json({ success: false, error: "Unable to delete todo list" });
  }
};

module.exports.updateCalendar = async (req, res) => {
  const editedCalendar = req.body;
  //console.log(editedCalendar);

  try {
    const calendar = await calendarSchema.findById(editedCalendar._id);
    calendar.title = editedCalendar.title;
    calendar.start = editedCalendar.start;
    calendar.end = editedCalendar.end;

    // Find the course with the specified id and update its properties
    const updatedCalendar = await calendarSchema.findByIdAndUpdate(
      editedCalendar._id,
      calendar,
      { new: true }
    );

    // Send the updated todoList as a response to frontend
    res.status(200).json({ success: true, calendarList: updatedCalendar });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false, error: "Unable to update calendar event" });
  }
};