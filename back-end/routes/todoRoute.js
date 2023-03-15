const router = require('express').Router();

const { inputTodo } = require("../controllers/todoController.js");
// if user authenticated
const { authMiddleware } = require('../middleware/authMiddleware.js');

// using POST the todo
router.post('/input-todoList', authMiddleware, inputTodo); 

module.exports = router;