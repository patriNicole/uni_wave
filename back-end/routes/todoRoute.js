const router = require('express').Router();

const { inputTodo, getTodo, deleteToDo, updateToDo } = require("../controllers/todoController.js");
// if user authenticated
const { authMiddleware } = require('../middleware/authMiddleware.js');

// using POST the todo
router.post('/input-todoList', authMiddleware, inputTodo); 
router.get('/get-todoList', authMiddleware, getTodo); 
router.delete('/delete-id/:id', authMiddleware, deleteToDo); 
router.put('/update-todo/:id', authMiddleware, updateToDo);

module.exports = router;