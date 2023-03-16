const router = require('express').Router();

const { inputTodo, getTodo, deleteToDo } = require("../controllers/todoController.js");
// if user authenticated
const { authMiddleware } = require('../middleware/authMiddleware.js');

// using POST the todo
router.post('/input-todoList', authMiddleware, inputTodo); 
router.get('/get-todoList', authMiddleware, getTodo); 
router.delete('/delete-id/:id', authMiddleware, deleteToDo);

module.exports = router;