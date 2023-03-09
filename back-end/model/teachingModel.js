const { model, Schema } = require("mongoose");

const teachingSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderEmail: {
      type: String,
      required: true,
    },
    senderImage: {
      type: String,
      required: true,
    },
    teachingTitle: {
      type: String,
      default: "",
    },
    teachingOverview: {
      type: String,
      default: "",
    },
    teachingFile: {
      type: String,
      default: "",
    },
    teachingFileText: {
      type: String,
      default: "",
    },

    teachingVideo: {
      type: String,
      default: "",
    },
    teachingVideoText: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("teaching", teachingSchema);
