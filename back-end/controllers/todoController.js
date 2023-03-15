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

module.exports.getTodo = async (req, res) => {
  // req.myId from authMiddleware
  const myId = req.myId;
  try {
    let todoList = [];
    // Get all User except itself
    const todoGet = await todoSchema.find({
      _id: {
        // The query is using the "$ne" (not equal) operator to retrieve
        // all documents except for the one with the matching "_id"
        $ne: myId,
      },
    });

    todoList = [...todoGet];

    res.status(200).json({ success: true, todoList: todoList });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};
