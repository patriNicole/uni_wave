const todoSchema = require("../model/todoModel.js");

module.exports.inputTodo = async (req, res) => {
  // req.myId from authMiddleware
  const myToDo = req.body;
  //console.log(myToDo);
  try {
    const insertCourse = await todoSchema.create({
      senderId: myToDo.senderId,
      senderName: myToDo.senderName,
      text: myToDo.text,
      category: myToDo.category,
      completed: myToDo.completed,
    });

    res.status(200).json({ success: true, todoList: insertCourse });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};
