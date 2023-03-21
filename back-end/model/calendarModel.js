const { model, Schema } = require("mongoose");

const calendarSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    allDay: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("calendar", calendarSchema);
