const { model, Schema } = require("mongoose");

const todoSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    text: { type: String, required: true },
    category: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("todo-list", todoSchema);
