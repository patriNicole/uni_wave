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

module.exports.deleteToDo = async (req, res) => {
  const { id } = req.params;
  //console.log(id)
  try {
    // Delete the todolist with the specified id
    await todoSchema.findByIdAndDelete(id);

    // Get all remaining todos
    const todos = await todoSchema.find();

    // Send the remaining todos as a response to frontend
    res.status(200).json({ success: true, todoList: todos });
  } catch (error) {
    //console.log(error);
    res
      .status(500)
      .json({ success: false, error: "Unable to delete todo list" });
  }
};

module.exports.updateToDo = async (req, res) => {
  const { id } = req.params.id;
  const { updatedTodo } = req.body;
  //console.log(req.params.id)

  try {
    /*const course = await teachingSchema.findById(courseId);
      course.teachingTitle = teachingTitle;

      // Find the course with the specified courseId and update its properties
      const updatedCourse = await teachingSchema.findByIdAndUpdate(
        courseId,
        course,
        { new: true }
      );

      // Send the updated course as a response to frontend
      res.status(200).json({ success: true, course: updatedCourse });*/
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false, error: "Unable to update course" });
  }
};
