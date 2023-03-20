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