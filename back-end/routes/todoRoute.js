const router = require('express').Router();

const { inputTodo, getTodo } = require("../controllers/todoController.js");
// if user authenticated
const { authMiddleware } = require('../middleware/authMiddleware.js');

// using POST the todo
router.post('/input-todoList', authMiddleware, inputTodo); 
router.get('/get-todoList', authMiddleware, getTodo); 

module.exports = router;